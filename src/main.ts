import express from "express";
import { Request, Response, NextFunction} from "express"
import { ExpressUserRouter } from "./lib/User/infrastructure/ExpressUserRouter";


const app = express();

app.use(express.json());

app.use(ExpressUserRouter);

app.use((
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
if (err instanceof Error) {
    console.error(err.stack);
    return res.status(500).json(err.message)    
}

    console.error(err);
    return res.status(500).json('Something wrong!')
})

app.listen(3000, ()=> {
    console.log("Server is running on http://localhost:3000")
}) 