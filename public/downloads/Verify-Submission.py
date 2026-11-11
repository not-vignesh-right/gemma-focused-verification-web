"""Individual-file submission verifier. Written 11 November 2026.
Runs the supplied offline checker only, never the original inference scripts.
Python 3.10+, standard library only; no network or model loading.
"""
from pathlib import Path
import json,hashlib,tempfile,subprocess,sys
P=Path(__file__).resolve().parent

def main():
    sources=json.loads((P/'Implementation-Source.json').read_text())
    records=json.loads((P/'Captured-Test-Records.json').read_text())
    files={}
    for bundle in [sources,records]:
        for name,text in bundle['files'].items():
            path=Path(name)
            if path.is_absolute() or '..' in path.parts:raise ValueError('Unsafe member path')
            if name in files:raise ValueError('Duplicate member path')
            files[name]=text
    manifest=json.loads(files['MANIFEST.json'])
    for name,h in manifest.items():
        if hashlib.sha256(files[name].encode('utf-8')).hexdigest()!=h:raise ValueError('Hash mismatch: '+name)
    with tempfile.TemporaryDirectory(prefix='study-evidence-check-') as td:
        root=Path(td)
        for name,text in files.items():
            f=root/name;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(text.encode('utf-8'))
        # Only this newly authored, integrity-checked offline verifier is executed.
        result=subprocess.run([sys.executable,str(root/'verify_evidence.py')],capture_output=True,text=True)
        print(result.stdout,end='')
        if result.returncode:print(result.stderr,file=sys.stderr);return result.returncode
    return 0
if __name__=='__main__':
    try:sys.exit(main())
    except Exception as e:print('FAIL:',str(e),file=sys.stderr);sys.exit(1)
