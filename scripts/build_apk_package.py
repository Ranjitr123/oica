#!/usr/bin/env python3
"""
OICS Android App Builder
Invokes the genuine APK packager and signer to ensure installable, valid APK binaries.
"""
import os
import sys
from build_real_oics_apk import build_oics_apk

if __name__ == '__main__':
    print("Building genuine OICS Android APK package...")
    build_oics_apk()
