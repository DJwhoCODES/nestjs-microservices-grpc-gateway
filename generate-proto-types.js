const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROTO_SRC_DIR = path.join(__dirname, 'src/libs/proto');
const PROTO_OUT_DIR = path.join(__dirname, 'src/libs/proto-types');

function generateProtoTypes() {
  if (!fs.existsSync(PROTO_SRC_DIR)) {
    console.error(`❌ Proto source directory does not exist: ${PROTO_SRC_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(PROTO_OUT_DIR)) {
    fs.mkdirSync(PROTO_OUT_DIR, { recursive: true });
    console.log(`📁 Created output directory: ${PROTO_OUT_DIR}`);
  }

  // 🛠️ Wrap paths in quotes to handle spaces in Windows paths
  const command = `npx protoc \
    --ts_proto_out="${PROTO_OUT_DIR}" \
    --ts_proto_opt=nestJs=true \
    --proto_path="${PROTO_SRC_DIR}" \
    "${PROTO_SRC_DIR}/*.proto"`;

  console.log('🚀 Generating proto types...');
  try {
    execSync(command, { stdio: 'inherit' });
    console.log('✅ Successfully generated proto types!');
  } catch (err) {
    console.error('❌ Failed to generate proto types');
    process.exit(1);
  }
}

generateProtoTypes();
