// ═══════════════════════════════════════════════════════════════════════════
// @amlhubs/tei-p5 — TEI P5 4.11.0 (linguistic subset)
// Text Encoding Initiative — Guidelines for Electronic Text Encoding and
// Interchange — Edition 4.11.0 (TEI Consortium, last updated 2026-02-18,
// revision 358d2e48e — https://tei-c.org/release/doc/tei-p5-doc/en/html/)
//
// SCOPE — LINGUISTIC SUBSET ONLY
// ───────────────────────────────
// TEI P5 declares ~600 element types across ~25 modules. This 0.0.1 release
// implements ONLY the seven linguistic-encoding modules required by
// computational-linguistics, lexicography, and corpus workflows:
//
//   - Dictionaries (Chapter 9):  <entry>, <form>, <orth>, <pron>, <gramGrp>,
//                                <pos>, <gen>, <number>, <case>, <person>,
//                                <mood>, <tense>, <sense>, <def>, <cit>,
//                                <quote>, <usg>, <re>, <xr>
//   - Linguistics (Chapter 18):  Simple Analytic Mechanisms — <s>, <w>, <c>,
//                                <pc>, <seg>, <span>, <spanGrp>, <interp>,
//                                <interpGrp>; @ana, @lemma, @msd
//   - Analysis (Chapter 17):     Linguistic-analysis attribute spine (cited
//                                via the @ana / @lemma / @msd surface above)
//   - Corpus (Chapter 16):       <teiHeader> linguistic-metadata subset —
//                                <textDesc>, <particDesc>, <settingDesc>,
//                                <person>, <personGrp>, <language>
//   - Gaiji (Chapter 5):         <g>, <char>, <charDecl>, <glyph>, <mapping>
//   - NamesDates (Chapter 13):   <name>, <persName>, <placeName>, <orgName>,
//                                <foreName>, <surname>, <roleName>, <addName>,
//                                <country>, <region>, <settlement>, <geo>
//   - Transcr (Chapter 11):      <choice>, <orig>, <reg>, <sic>, <corr>,
//                                <abbr>, <expan>, <subst>, <add>, <del>
//
// Approximately 80 element types are surfaced. The remaining TEI modules —
// manuscripts, drama, verse, certainty, figures, performance, msdesc,
// header (non-linguistic parts), tagdocs, transcr (non-linguistic parts),
// textcrit, fs, nets, iso-fs, etc. — are deferred to subsequent @amlhubs/tei-*
// packages and will extend the metaclasses surfaced here through the TEI
// ODD module-customization mechanism.
//
// Architectural ordering:
//   UML 2.5.1 (@amlhubs/uml) ──┐
//                              ├──► TEI P5 linguistic subset (this file)
//   MOF 2.5.1 (@amlhubs/mof) ──┘
//
// TEI P5 depends on UML for IClass / IDataType / IPackage and on MOF for the
// reflective machinery that lets agents query a TEI document's metamodel-shape
// at runtime.
//
// Three-Layer Pattern compliance (per @amlhubs/.claude/rules/convention/abstract-class.md):
//   Layer 1 — IFoo<T1, ..., Tn>             (generic interface, NO `const`)
//   Layer 2 — AbstractFoo<const T1, ...>    (abstract class, `const` on every type param)
//   Layer 3 — Foo{Instance}                 (concrete class, zero type params, registry-bound)
//
// Citation discipline: every metaclass carries JSDoc with @standard, @section
// (TEI guideline ID, e.g. §9.1, §18.1), @element, @generalization, @definition,
// @attributes, @content, @constraints reproduced verbatim from the TEI P5
// 4.11.0 Guidelines.
//
// Out of scope for 0.0.1:
//   - Manuscripts module (Chapter 10 — msdesc)
//   - Drama module (Chapter 7)
//   - Verse module (Chapter 6)
//   - Performance module (Chapter 7 — performance)
//   - Figures module (Chapter 14)
//   - Tagdocs module (Chapter 22 — ODD)
//   - Textcrit module (Chapter 12 — critical apparatus)
//   - Certainty/responsibility module (Chapter 21)
//   - Feature structures module (Chapter 19 — fs)
//   - ISO feature structures (Chapter 19 — iso-fs)
//   - Networks/graphs module (Chapter 20 — nets)
//   - Non-linguistic <teiHeader> parts (encodingDesc, revisionDesc, etc.)
// Each deferred module will be deployed as its own @amlhubs/tei-{module}
// package and will extend the metaclasses surfaced here through the TEI ODD
// module-customization mechanism.
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// TEI P5 LINGUISTIC-SUBSET METACLASSES (authored by sequential implementer
// subagents per the deploy verb workflow defined in .claude/commands/metamodel.md)
// ═══════════════════════════════════════════════════════════════════════════
// BEGIN-EXTRACTED-TEI-P5-LINGUISTIC

// (Implementer subagent 1 inserts the Gaiji + NamesDates module metaclasses here)

// (Implementer subagent 2 inserts the Dictionaries module metaclasses here)

// (Implementer subagent 3 inserts the Linguistics + Analysis module metaclasses here)

// (Implementer subagent 4 inserts the Corpus module metaclasses here)

// (Implementer subagent 5 inserts the Transcr module metaclasses here)

// END-EXTRACTED-TEI-P5-LINGUISTIC

// ─── Sentinel export so the empty 0.0.0 snapshot type-checks ────────────────
// Implementers REPLACE this with the actual type exports as metaclasses are
// inserted above. The Three-Layer Pattern (interface + abstract + concrete)
// is mandatory; every concrete class supplies one type argument per parent
// type parameter; every member that overrides an abstract parent member
// carries the `override` modifier (required under noImplicitOverride: true).
export const TEI_P5_VERSION = '0.0.1' as const;
export const TEI_P5_EDITION = '4.11.0' as const;
export const TEI_P5_REVISION = '358d2e48e' as const;
export const TEI_P5_SCOPE = 'linguistic-subset' as const;
