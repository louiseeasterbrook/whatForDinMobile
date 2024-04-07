export class Environment {
  private static instance: Environment;

  protected constructor() {}

  public async setup(): Promise<void> {}

  public static getInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }
}
