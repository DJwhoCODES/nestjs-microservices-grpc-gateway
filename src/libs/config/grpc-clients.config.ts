// libs/config/grpc-client-loader.ts
import { Transport, ClientProviderOptions } from '@nestjs/microservices';
import { join } from 'path';
import axios from 'axios';

export const loadGrpcClient = async (
  name: string,
  service: string,
  protoPath: string,
  packageName: string,
): Promise<ClientProviderOptions> => {
  const { data: url } = await axios.get(`http://localhost:3000/discover?service=${service}`);
  return {
    name,
    transport: Transport.GRPC,
    options: {
      package: packageName,
      protoPath,
      url,
    },
  };
};
