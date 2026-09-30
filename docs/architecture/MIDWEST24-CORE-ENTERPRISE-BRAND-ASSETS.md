# Midwest24 Core Enterprise brand assets

Status: active implementation record
Product identity authority: [ACP-011 — Midwest24 Core Product Identity and System Naming](acp/ACP-011-MIDWEST24-CORE-PRODUCT-IDENTITY-AND-SYSTEM-NAMING.md)
Artwork authority: `midwest24-site/assets/branding/source/enterprise/README.md`
Implementation repository: `mwg-ofbiz`

## Approved visual system

Midwest24 Core Enterprise uses the approved Core-family building-shield icon,
full horizontal Enterprise wordmark, and seven-file favicon package. The assets were
approved on 2026-09-11 and recorded by the canonical branding repository as
**activation pending**. This application-level adoption does not change product
authority, system behavior, or public-host activation.

The prior draft M24 shield did not match the approved Core family and is not
part of the controlled asset set.

## Controlled application copies

| ID | Served path | SHA-256 |
| --- | --- | --- |
| `M24_CORE_ENTERPRISE_WORDMARK_V2` | `/enterprise-poc/images/midwest24-core-enterprise-logo-light-v2.png` | `33f1700c7bacafa423e5565cb067267a8fb4461947f381212911153fcb0a86de` |
| `M24_CORE_ENTERPRISE_ICON_V1` | `/enterprise-poc/images/midwest24-core-enterprise-icon.png` | `34a78f07a4d6303cd039fa93a3df25070d81ecbe7514364cb56a12c294c328dc` |
| `M24_CORE_ENTERPRISE_FAVICON_ICO_V1` | `/enterprise-poc/images/favicon.ico` | `fc3925ebd9f12dd9da467b5f9091a26941f043b6dafdf7d106f0afc65f8f2da2` |

`mwg-ofbiz/plugins/midwest24-enterprise/webapp/enterprise-poc/images/brand-assets.json`
is the machine-readable asset manifest. It records every favicon/package file,
checksums, stable IDs, and source provenance.

## Maintenance rule

Do not redesign or independently regenerate Enterprise artwork inside an
implementation repository. Changes begin in the approved source path in
`midwest24-site`, pass visual review, and are then copied deliberately into the
Enterprise application. Update the manifest, implementation contract, and this
MkDocs record in the same change.

## Verification

Validate checksums and manifest parsing, load owned pages to verify the standard
favicon package, and inspect the icon and wordmark at desktop and mobile sizes.
