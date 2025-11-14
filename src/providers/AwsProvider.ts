import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

export class AwsProvider {
  private client: SecretsManagerClient;

  constructor(region?: string) {
    this.client = new SecretsManagerClient({ region });
  }

  async getSecretValue(secretName: string): Promise<string | undefined> {
    try {
      const command = new GetSecretValueCommand({ SecretId: secretName });
      const response = await this.client.send(command);
      if (response.SecretString) {
        return response.SecretString;
      } else if (response.SecretBinary) {
        // If secret is binary, decode it
        const buff = Buffer.from(response.SecretBinary as Uint8Array);
        return buff.toString('utf-8');
      }
      return undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`Error retrieving secret ${secretName}:`, error.message);
      throw error;
    }
  }

  // Example method similar to SalesForceProvider style for retrieving a specific secret key
  async getSecretKey(secretName: string, key: string): Promise<string | undefined> {
    const secretString = await this.getSecretValue(secretName);
    if (!secretString) return undefined;
    try {
      const secretObj = JSON.parse(secretString);
      return secretObj[key];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`Error parsing secret JSON for ${secretName}:`, error.message);
      return undefined;
    }
  }
}
