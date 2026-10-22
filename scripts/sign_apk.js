
const { PackageSigner } = require('@chromeos/android-package-signer');
const fs = require('fs');

async function sign() {
  const signer = new PackageSigner('oics2026pass', 'oics');
  const dname = {
    commonName: 'OICS Institute',
    organizationName: 'Odisha Institute of Computer Studies',
    organizationUnit: 'Mobile Engineering',
    countryCode: 'IN',
  };
  const key = await signer.generateKey(dname);
  const apkBuf = fs.readFileSync('unsigned_oics.apk');
  const file = new File([apkBuf], 'oics-app.apk');
  const res = await signer.signPackage(file, key);
  const b64 = res.split('base64,')[1];
  const buf = Buffer.from(b64, 'base64');
  
  // Write to public/oics-app.apk
  fs.writeFileSync('public/oics-app.apk', buf);
  console.log('Successfully written signed APK to public/oics-app.apk! Size: ' + buf.length + ' bytes');
}
sign().catch((err) => {
  console.error('Signing failed:', err);
  process.exit(1);
});
