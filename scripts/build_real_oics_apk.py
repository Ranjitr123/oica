import zipfile
import struct
import zlib
import hashlib
import io
import os
import subprocess
from PIL import Image

def build_oics_apk():
    print("=== Step 1: Loading base APK template ===")
    with open('test.apk', 'rb') as f:
        base_zip = zipfile.ZipFile(f)
        all_files = {name: base_zip.read(name) for name in base_zip.namelist()}

    print(f"Loaded {len(all_files)} files from base template.")

    print("=== Step 2: Customizing resources.arsc (App Name: OICS Institute) ===")
    arsc = all_files['resources.arsc']
    pos = arsc.find(b'My Application')
    if pos != -1:
        arsc = arsc[:pos] + b'OICS Institute' + arsc[pos + 14:]
        all_files['resources.arsc'] = arsc
        print(f"Replaced 'My Application' with 'OICS Institute' at offset {pos}.")
    else:
        print("Warning: 'My Application' not found in resources.arsc")

    print("=== Step 3: Customizing classes.dex (Target URL & Checksums) ===")
    dex = bytearray(all_files['classes.dex'])
    target_str = b'https://github.com/bishwassagar'
    new_str = b'https://oics-institute.edu/?a=1' # Exactly 31 bytes
    assert len(target_str) == len(new_str) == 31, "String lengths must match exactly"

    idx = dex.find(target_str)
    if idx != -1:
        dex[idx:idx+31] = new_str
        print(f"Replaced portal URL at offset {idx}.")
    else:
        print("Warning: Target string not found in classes.dex")

    # Recalculate SHA-1 signature (bytes 32..end)
    sha1 = hashlib.sha1(dex[32:]).digest()
    dex[12:32] = sha1

    # Recalculate Adler32 checksum (bytes 12..end)
    checksum = zlib.adler32(dex[12:]) & 0xFFFFFFFF
    dex[8:12] = struct.pack('<I', checksum)
    all_files['classes.dex'] = bytes(dex)
    print("Recalculated classes.dex SHA-1 and Adler32 checksums successfully.")

    print("=== Step 4: Generating and Replacing App Icons ===")
    im = Image.open('mobile-app/assets/icon.png').convert('RGBA')
    icon_buffers = {}
    for size in [48, 72, 96, 144, 192]:
        buf = io.BytesIO()
        resized = im.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(buf, format='PNG')
        icon_buffers[size] = buf.getvalue()

    replaced_icons = 0
    for name, content in list(all_files.items()):
        if name.startswith('res/') and name.endswith('.png') and not name.endswith('.9.png'):
            if content[:8] == b'\x89PNG\r\n\x1a\n' and len(content) >= 24:
                w, h = struct.unpack('>II', content[16:24])
                if w == h and w in icon_buffers:
                    all_files[name] = icon_buffers[w]
                    replaced_icons += 1

    print(f"Replaced {replaced_icons} launcher icon assets with high-res OICS logo.")

    print("=== Step 5: Customizing offline.html ===")
    offline_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OICS Institute Portal</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #090d16;
            color: #f8fafc;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px;
            text-align: center;
        }
        .card {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(6, 182, 212, 0.3);
            border-radius: 20px;
            padding: 32px 24px;
            max-width: 420px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .badge {
            display: inline-block;
            background: rgba(6, 182, 212, 0.15);
            color: #22d3ee;
            border: 1px solid rgba(6, 182, 212, 0.4);
            padding: 4px 12px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            margin-bottom: 16px;
        }
        h1 { font-size: 20px; font-weight: 800; margin-bottom: 8px; color: #fff; }
        p { font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 24px; }
        .btn {
            display: block;
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #06b6d4, #2563eb);
            color: #fff;
            border: none;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            text-decoration: none;
            margin-bottom: 12px;
        }
        .btn-outline {
            background: transparent;
            border: 1px solid #334155;
            color: #cbd5e1;
        }
        .footer { font-size: 11px; color: #64748b; margin-top: 16px; }
    </style>
</head>
<body>
    <div class="card">
        <div class="badge">OICS MOBILE APP</div>
        <h1>Odisha Institute of Computer Studies</h1>
        <p>Connecting to official portal servers. Ensure mobile data or Wi-Fi is active to access student services, admissions, & verification.</p>
        <button class="btn" onclick="window.location.reload()">Reload OICS Portal</button>
        <div class="footer">ISO 9001:2026 Certified • Student Helpline: +91 79782 56023</div>
    </div>
</body>
</html>"""
    all_files['assets/offline.html'] = offline_html.encode('utf-8')

    print("=== Step 6: Packaging Unsigned APK Container ===")
    unsigned_apk = 'unsigned_oics.apk'
    # Exclude any previous signature files from META-INF so we sign fresh
    with zipfile.ZipFile(unsigned_apk, 'w', compression=zipfile.ZIP_DEFLATED) as out_zip:
        for name, content in all_files.items():
            if name.startswith('META-INF/') and (name.endswith('.SF') or name.endswith('.RSA') or name.endswith('MANIFEST.MF')):
                continue
            out_zip.writestr(name, content)

    print(f"Created {unsigned_apk} (Size: {os.path.getsize(unsigned_apk)} bytes)")

    print("=== Step 7: Signing APK with OICS Certificate via Node.js Signer ===")
    sign_script = """
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
"""
    with open('scripts/sign_apk.js', 'w', encoding='utf-8') as f:
        f.write(sign_script)

    result = subprocess.run(['node', 'scripts/sign_apk.js'], capture_output=True, text=True)
    print(result.stdout)
    if result.returncode != 0:
        print("Error during signing:", result.stderr)
        raise RuntimeError("Failed to sign APK")

    final_apk = 'public/oics-app.apk'
    print(f"=== BUILD COMPLETE! Final APK is ready at {final_apk} (Size: {os.path.getsize(final_apk)} bytes) ===")

if __name__ == '__main__':
    build_oics_apk()
