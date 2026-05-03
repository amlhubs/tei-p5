# @amlhubs/tei-p5 — TEI P5 4.11.0 (Linguistic Subset) as a Typed Metamodel

## Identity

| Field | Value |
|---|---|
| Standard | TEI P5: Guidelines for Electronic Text Encoding and Interchange |
| Edition | [4.11.0](https://tei-c.org/release/doc/tei-p5-doc/en/html/) — last updated 2026-02-18 (revision 358d2e48e) |
| Authority | [TEI Consortium](https://tei-c.org/) — community-governed standards body, public TEI Council, ISO-recognised humanities-encoding consortium |
| Source Repository | [TEIC/TEI on GitHub](https://github.com/TEIC/TEI) — ODD source compiled to RelaxNG, XSD, DTD, and HTML guidelines |
| ODD Format | One Document Does it all — TEI's literate-programming source for both schema and prose |
| npm Package | `@amlhubs/tei-p5` |
| npm Version | `0.0.1` |
| Peer Dependencies | `@amlhubs/uml@^0.0.2`, `@amlhubs/mof@^0.0.1` |
| License | MIT |

## ⚠ Scope-Reduction Statement — Linguistic Subset Only

**TEI P5 4.11.0 declares ~600 element types across ~25 modules. This 0.0.1 release implements ONLY the seven linguistic-encoding modules.** The remaining modules — manuscripts (msdesc), drama, verse, performance, figures, tagdocs (ODD), textcrit (critical apparatus), certainty, feature structures (fs / iso-fs), networks (nets), and the non-linguistic parts of `<teiHeader>` — are explicitly **out of scope** for v0.0.1 and will be deployed as separate `@amlhubs/tei-{module}` packages in subsequent releases.

The seven in-scope linguistic modules are:

| TEI Module | TEI Chapter | Coverage |
|---|---|---|
| `dictionaries` | 9 | Dictionary entry structure: `<entry>`, `<form>`, `<orth>`, `<pron>`, `<gramGrp>`, `<pos>`, `<gen>`, `<number>`, `<case>`, `<person>`, `<mood>`, `<tense>`, `<sense>`, `<def>`, `<cit>`, `<quote>`, `<usg>`, `<re>`, `<xr>` |
| `linguistics` (+ `analysis`) | 18 (+ 17) | Simple analytic mechanisms — `<s>`, `<w>`, `<c>`, `<pc>`, `<seg>`, `<span>`, `<spanGrp>`, `<interp>`, `<interpGrp>` with `@ana`, `@lemma`, `@msd` |
| `corpus` | 16 | Corpus-header linguistic metadata — `<teiHeader>` (linguistic subset), `<textDesc>`, `<particDesc>`, `<settingDesc>`, `<person>`, `<personGrp>`, `<language>` |
| `gaiji` | 5 | Non-standard characters and glyphs — `<g>`, `<char>`, `<charDecl>`, `<glyph>`, `<mapping>` |
| `namesdates` | 13 | Names of persons, places, and organisations — `<name>`, `<persName>`, `<placeName>`, `<orgName>`, `<foreName>`, `<surname>`, `<roleName>`, `<addName>`, `<country>`, `<region>`, `<settlement>`, `<geo>` |
| `transcr` | 11 | Transcription editorial interventions — `<choice>`, `<orig>`, `<reg>`, `<sic>`, `<corr>`, `<abbr>`, `<expan>`, `<subst>`, `<add>`, `<del>` |

Approximately 80 element types are surfaced in this 0.0.1 release. Consumers requiring elements from out-of-scope modules MUST wait for the corresponding subsequent `@amlhubs/tei-{module}` release. No element from an out-of-scope module is silently filled in or stubbed; absence is structurally enforced through the omitted Three-Layer Pattern declarations.

## Abstract

The Text Encoding Initiative is the community-governed humanities-encoding consortium that has, since 1987, maintained the de-facto international standard for representing literary, linguistic, and historical texts in machine-readable form. TEI P5 — the fifth major revision — is published as a single normative literate document called the *Guidelines* together with a compiled RelaxNG schema, an XSD schema, and a DTD, all generated from the underlying ODD ("One Document Does it all") source. Edition 4.11.0, released by the TEI Council on 2026-02-18 at revision 358d2e48e, is the current stable edition implemented here.

Within TEI P5's roughly 600 element types, the **linguistic encoding subset** — dictionaries, simple analytic mechanisms (linguistics + analysis), corpus headers, gaiji (characters and glyphs), names and dates, and editorial-transcription interventions — covers the encoding needs of computational lexicography, NLP corpus annotation, philological transcription, multilingual text encoding, and dictionary-publication workflows. The `@amlhubs/tei-p5` 0.0.1 npm package surfaces **only that subset** as extensible TypeScript interfaces and base classes following the `@amlhubs` Three-Layer Pattern: every metaclass appears as `IFoo<T>` (generic interface), `AbstractFoo<const T>` (inference-site abstract class), and `Foo{Instance}` (registered concrete). Every interface carries a JSDoc header citing the precise TEI P5 4.11.0 guideline section that defines it, making each symbol an auditable projection of the TEI Guidelines rather than an internal invention.

## Business Value — Why Extending This Metamodel Pays Off

Adopting TEI through a typed package produces an immediate interoperability dividend. Every modern humanities-encoding platform — [Oxygen XML Editor](https://www.oxygenxml.com/), [TEI Publisher](https://teipublisher.com/), [eXist-db](http://exist-db.org/), [TXM corpus platform](https://txm.gitpages.huma-num.fr/textometrie/), [INCEpTION](https://inception-project.github.io/), the [DARIAH](https://www.dariah.eu/) and [CLARIN](https://www.clarin.eu/) European research infrastructures, [TextGrid](https://textgrid.de/), [Brown WWP](https://www.wwp.northeastern.edu/), and every academic-press digital edition produced under the [TEI Consortium membership](https://tei-c.org/membership/) — converges on TEI P5 as the machine-readable target for primary-source encoding. A document expressed against the metaclasses `@amlhubs/tei-p5` exports is, by construction, portable to every one of those platforms without a custom converter. Lexicography ventures that would otherwise spend quarters re-implementing per-platform exporters — a Wiktionary-to-TEI converter, a custom dictionary-typesetting-to-TEI converter, a corpus-annotation-to-TEI converter — amortize that engineering cost to zero.

TEI Consortium adoption turns internal architectural decisions into community-recognised artifacts. TEI P5 is cited in [ELEXIS infrastructure](https://elex.is/), in [Lexonomy](https://www.lexonomy.eu/) as the canonical lexicon-export target, in the [European Language Grid](https://www.european-language-grid.eu/), in [DBnary](http://kaiko.getalp.org/about-dbnary/) as the dictionary-import substrate, in the [Open Dictionary of English](https://www.oed.com/) production pipeline, and in every [LREC](https://lrec-conf.org/) proceedings track on lexical-resource interchange. ISO 24613-4:2024 (LMF Part 4) standardises a TEI P5 serialisation of LMF lexicons, making TEI the ISO-blessed interchange format for the LMF metamodel surfaced in [`@amlhubs/lmf-core`](../lmf-core/README.md). A regulated vendor — a dictionary publisher subject to dictionary-format interchange standards, an academic press subject to TEI-mandated funder policies, a national-corpus project subject to CLARIN compliance — presents the same TEI surface to an auditor without translating internal jargon into TEI-speak.

The second business lever is agentic runtime leverage. Ageni's Probabilistic Reduction Engine consumes the TEI metamodel as the deterministic substrate over which large-language-model reasoning operates on humanities texts. When an agent writes source code against `IEntry`, `IForm`, `IOrth`, `IGramGrp`, and `IDef`, the TypeScript compiler evaluates whether the proposed dictionary-entry structure is a well-formed TEI dictionary at the same moment the compiler evaluates whether the code itself is well-formed — the two correctness checks collapse into one `tsc` pass. Structural hallucinations that would otherwise slip past a natural-language review (inventing a `<sense>` outside an `<entry>`, mis-attributing a `<gramGrp>` to a `<sense>` rather than a `<form>`, violating the `<choice>`/`<orig>`/`<reg>` containment constraint) are caught at compile time, and every surviving interface reference traces to a TEI guideline section through the JSDoc header. The agent's reasoning surface is reduced from the open set of possible English sentences about TEI to the closed set of typed TEI metaclass compositions.

The third lever is compounding reuse across the AML linguistic stack. TEI P5's linguistic subset is the interchange surface that pairs with the LMF metamodel surfaced in [`@amlhubs/lmf-core`](../lmf-core/README.md): the LMF Core's `LexicalResource`/`LexicalEntry`/`Form`/`Sense`/`Definition` decomposition maps directly to TEI's `<TEI>`/`<entry>`/`<form>`/`<sense>`/`<def>`. Future AML packages that touch lexical resources — `@amlhubs/lmf-mrd` (Part 2), `@amlhubs/lmf-tei` (Part 4 — TEI serialisation of LMF), `@amlhubs/ontolex` (W3C lexicon-ontology binding), `@amlhubs/maf` (ISO 24611 morpho-syntactic annotation) — interoperate through TEI as the human-readable interchange layer. Every downstream ageni venture that reasons about words, lemmas, dictionary entries, character variants, names, places, or critical apparatus consumes these same TEI metaclasses through their transitively-dependent packages. The engineering investment that produced `@amlhubs/tei-p5` is not charged to any single venture; it is amortized over every venture that ever extends it.

The fourth lever is composability across the OMG/ISO/community-standard specification stack. TEI P5 metaclasses extend UML 2.5.1: every TEI element realises a UML `IClass` carrying owned attributes typed by UML `IDataType`/`IPrimitiveType` and connected by UML `IAssociation` instances reflecting the TEI content model. The `@amlhubs/tei-p5` package depends on `@amlhubs/uml` for those structural types and on `@amlhubs/mof` for the reflective machinery that lets agents query a TEI document's metamodel-shape at runtime. Owning the typed packages from UML through MOF through TEI — rooted in the single UML foundation that underpins the entire AML graph — gives the ageni platform one coherent metamodeling surface for both code, lexical resources (LMF), and humanities encoding (TEI) rather than three loosely-coupled specifications, and makes every future agentic capability that touches a TEI document a composition of capabilities already expressed in the same formal language.

## Scope — What the Package Surfaces

The package exports the TEI P5 4.11.0 linguistic-subset element metaclasses grouped by TEI module. The complete enumeration lives in `src/tei-p5.ts`; the table below summarises the groups and cites the authoritative TEI chapter.

| TEI Module | Chapter | Element Metaclasses Surfaced |
|---|---|---|
| Gaiji | §5 | `IG`, `IChar`, `ICharDecl`, `IGlyph`, `IMapping` |
| Transcr | §11 | `IChoice`, `IOrig`, `IReg`, `ISic`, `ICorr`, `IAbbr`, `IExpan`, `ISubst`, `IAdd`, `IDel` |
| NamesDates | §13 | `IName`, `IPersName`, `IPlaceName`, `IOrgName`, `IForeName`, `ISurname`, `IRoleName`, `IAddName`, `ICountry`, `IRegion`, `ISettlement`, `IGeo` |
| Corpus | §16 | `ITeiHeader`, `ITextDesc`, `IParticDesc`, `ISettingDesc`, `IPerson`, `IPersonGrp`, `ILanguage` |
| Analysis | §17 | (attribute spine — exposed as `@ana`, `@lemma`, `@msd` on Linguistics elements) |
| Linguistics | §18 | `IS`, `IW`, `IC`, `IPc`, `ISeg`, `ISpan`, `ISpanGrp`, `IInterp`, `IInterpGrp` |
| Dictionaries | §9 | `IEntry`, `IForm`, `IOrth`, `IPron`, `IGramGrp`, `IPos`, `IGen`, `INumber`, `ICase`, `IPerson` (Dict), `IMood`, `ITense`, `ISense`, `IDef`, `ICit`, `IQuote`, `IUsg`, `IRe`, `IXr` |

Every interface is accompanied by an extensible base class with the same name minus the `I` prefix (e.g., `Entry`, `Form`, `Orth`). The full list and the JSDoc headers citing each TEI chapter live at [`src/tei-p5.ts`](./src/tei-p5.ts).

## Dependency Topology

`@amlhubs/tei-p5` is a downstream consumer of UML and MOF. It depends on both. Future TEI module-specific packages depend on it.

```
@amlhubs/uml  (root, zero dependencies)
      ▲
      │ peerDependency
      ├── @amlhubs/mof   (reflective machinery over UML)
      │        ▲
      │        │ peerDependency
      │        │
      └────────┴── @amlhubs/tei-p5    (THIS PACKAGE — TEI P5 linguistic subset)
                          ▲
                          │ (future extensions)
                          ├── @amlhubs/tei-msdesc       (manuscripts module)
                          ├── @amlhubs/tei-drama        (drama module)
                          ├── @amlhubs/tei-verse        (verse module)
                          ├── @amlhubs/tei-textcrit     (critical apparatus)
                          ├── @amlhubs/tei-fs           (feature structures)
                          ├── @amlhubs/tei-iso-fs       (ISO feature structures)
                          ├── @amlhubs/tei-figures      (figures + tables)
                          ├── @amlhubs/tei-performance  (performance encoding)
                          └── @amlhubs/tei-tagdocs      (ODD documentation)
```

The edges are load-bearing. `@amlhubs/tei-p5` imports `IElement`, `IClass`, `IPackage` from `@amlhubs/uml` to type each TEI element as a UML metaclass instance, and imports `ITag`, `IFactory` from `@amlhubs/mof` so that downstream agentic consumers can query the metamodel-shape of any TEI document at runtime through the MOF reflection ring.

## Installation & Usage

```bash
npm install @amlhubs/tei-p5
```

```typescript
import type {
  IEntry,
  IForm,
  IOrth,
  ISense,
  IDef,
  IGramGrp,
} from '@amlhubs/tei-p5';

// Declare a TEI <entry> as a typed metamodel instance.
const helloEntry: IEntry = {
  elementId: 'TEI_Entry_hello',
  // ... TEI dictionary-entry attributes per §9.1
};
```

The source artifact is [`src/tei-p5.ts`](./src/tei-p5.ts). Every interface JSDoc header declares `@standard TEI P5 4.11.0` and a `@section §x.y` reference to the corresponding chapter of the TEI Guidelines.

## Provenance & Formal References

- [TEI Consortium home](https://tei-c.org/)
- [TEI P5 4.11.0 Guidelines (HTML)](https://tei-c.org/release/doc/tei-p5-doc/en/html/)
- [TEIC/TEI on GitHub — ODD source repository](https://github.com/TEIC/TEI)
- [TEI Council](https://tei-c.org/activities/council/) — governance body
- [TEI ODD specification](https://tei-c.org/release/doc/tei-p5-doc/en/html/TD.html)
- [ISO 24613-4:2024 — LMF Part 4 (TEI serialisation)](https://www.iso.org/standard/82015.html)
- [TEI Vault — historical editions archive](https://tei-c.org/Vault/P5/)

## Version History

| Version | Date | Change Summary |
|---|---|---|
| 0.0.1 | 2026-05-03 | Initial publish — TEI P5 4.11.0 linguistic subset (~80 elements across dictionaries, linguistics, analysis, corpus, gaiji, namesdates, transcr modules); ~520 elements from other modules deliberately deferred to subsequent `@amlhubs/tei-{module}` packages |

## License

MIT — public npm access under `@amlhubs` scope at [npm.pkg.github.com](https://npm.pkg.github.com).
