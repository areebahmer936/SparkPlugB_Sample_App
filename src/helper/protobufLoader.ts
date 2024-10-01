import * as protobuf from 'protobufjs';
import path from 'path';

export async function loadProtobuf(): Promise<protobuf.Root> {
    const protoPath = path.resolve(__dirname, '../protobuf/sparkplug_b.proto');
    const root = await protobuf.load(protoPath);
    return root;
}
