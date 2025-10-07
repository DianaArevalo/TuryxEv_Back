import { 
    Hotel,    
    HotelId, 
    HotelLocation, 
    HotelName, 
    HotelPassword, 
    HotelPlan, 
    HotelRepository,    
    HotelScore,    
    HotelNotFoundError,
    CityRepository} from "../../domain";

const VALID_PLAN = ['FREE', 'BASIC', 'PREMIUM'] as const;
const VALID_STATUS = ['OPEN', 'CLOSED', 'BLOCKED'] as const;
const VALID_SCORE = [1, 2, 3, 4, 5]; // Corregido para reflejar puntajes válidos
const DEFAULT_SCORE = 0;


export interface HotelEditProps {
  id: string; // Obligatorio, para buscar el hotel
  name?: string; // Opcional, editable
  password?: string; // Opcional, editable
  location?: string; // Opcional, editable (string desde el frontend)
  plan?: string; // Opcional, editable (FREE, BASIC, PREMIUM)
  status?: string; // Opcional, editable (OPEN, CLOSED, BLOCKED)
  score?: number; // Opcional, editable
  syncWithGoogle?: boolean; // Opcional, para sincronizar score
}

interface HotelResponses {
  data: ReturnType<Hotel["toResponse"]>;
}

export class HotelEdit {
    constructor(
        private readonly repository: HotelRepository,
        //private readonly googleService?: GoogleService
        private readonly locationService?: CityRepository
    ) {}

async handler(props: HotelEditProps): Promise<HotelResponses> {

    //buscar el hotel existente
    const currentHotel = await this.repository.getOneById(new HotelId(props.id));
    if (!currentHotel) {
        //throw new HotelNotFoundError(`Hotel not found`);
        throw new Error(`${props.id}`+ HotelNotFoundError.prototype.message);
    }   

    // Validar ubicación si se proporciona
if (props.location) {
    if (!this.locationService) {
    throw new Error('Location service is not available');
    }
    const isValidCity = await this.locationService.isValidCity(props.location);
    if (!isValidCity) {
    throw new Error('La ciudad no es válida');
    }  
}

const location = props.location
    ? await HotelLocation.create(props.location, this.locationService as CityRepository)
    : currentHotel.location;


    //score con google
let scoreValue = props.score ?? currentHotel.score.getValue() ?? DEFAULT_SCORE;
    if (props.syncWithGoogle && this.googleService) {
        scoreValue = await this.googleService.getGoogleStars(props.id);
    if (!VALID_SCORE.includes(Math.round(scoreValue))) {
        throw new Error(`Google score ${scoreValue} is not valid, must be one of ${VALID_SCORE.join(', ')}`);
  }
}
const score = HotelScore.create(scoreValue);


   // Crear el objeto Hotel actualizado
const hotel = new Hotel({
    hotelId: currentHotel.hotelId,
    name: props.name ? new HotelName(props.name) : currentHotel.name,
    password: props.password ? new HotelPassword(props.password) : currentHotel.password,
    location: location,
    plan: props.plan && VALID_PLAN.includes(props.plan as any) ? HotelPlan.create(props.plan as any) : currentHotel.plan,
    status: props.status && VALID_STATUS.includes(props.status as any) ? props.status as any : currentHotel.status,
    score: score,
    email: currentHotel.email,
    syncWithGoogle: props.syncWithGoogle ?? false,
});


    const HotelChanged = await this.repository.edit(hotel) as Hotel;

    return {
        data: HotelChanged.toResponse(),
    };   
   
        
    }
}