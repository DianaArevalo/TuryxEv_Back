export interface UseCase<Input = void, Output = void> {
  execute(props: Input): Promise<Output>;
}
