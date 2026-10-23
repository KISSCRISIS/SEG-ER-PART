# SEG Deployment Alignment — Local Artifact Evidence

captured_at_utc=2026-08-22T21:12:45Z
repository=https://github.com/KISSCRISIS/manus.git
branch=main
commit=47f1fff5a1c82820cc772a10b162a5920f3a3333

## Commands
| Command | Result |
|---|---|
| `pnpm check` | PASS |
| `pnpm build` | PASS |

## Generated artifact
dist_public_exists=true
server_bundle_exists=true
entry_html_sha256=51b2f1b9281b76558d518268a37c56e58770d8afc4b9b9ba645bab0caa31b318
server_bundle_sha256=9f907870b2273ce35c8c5b2065188a01d3e6e1315ad21ffadf6993a43add01c5
entry_html_bytes=368229
server_bundle_bytes=41671

## Client entry resources
/assets/index-_gIcw5uh.css|PRESENT|230792|b9cd5a7b097a118955c1d96f453de518d8e15c40a91d48a72cbcf2df155f075a
/assets/vendor-data-C16s1bxA.js|PRESENT|54564|e6f93422ce4407518a82224cea851b5369ea318fc9b21dd443403bae2a40adc3
/assets/vendor-react-bNcsr7c2.js|PRESENT|17468|c7e15638826bf72bed2fadaefe59aecd03345375d9492e44369c88c1cc783158
/assets/vendor-ui-O8KUtL4C.js|PRESENT|59372|3cdabb721388e36da10a51407ded6ea9a65e188a6781f5917cb3dfd7a669c33f
/assets/index-DEDnZyT2.js|PRESENT|468166|f2c69f223bb527e8d023f140515762f0e6c83a33c72b9ee8cced8b2274bc1c07

## Required markers
laboratory_route_marker=2
demo_data_marker=1
healthz_server_marker=1
trpc_server_marker=2

## Route/build interpretation
The local artifact contains the intended Laboratory route and demo-only marker, and the server bundle contains the current health and tRPC path markers. No deployment was performed.
