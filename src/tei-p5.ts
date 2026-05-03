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

// ───────────────────────────────────────────────────────────────────────────
// WAVE 1 — GAIJI MODULE (TEI P5 §5) + NAMESDATES MODULE (TEI P5 §13)
// ───────────────────────────────────────────────────────────────────────────
//
// Gaiji (Characters, Glyphs, and Writing Modes) provides mechanisms for
// encoding non-standard characters and glyphs not present in Unicode, while
// NamesDates provides a closed taxonomy for proper nouns (persons, places,
// organisations) used in linguistic and humanistic analysis.

// Type-only reference to the UML metaclass surface (each TEI element
// projects to a UML `IClass` instance per the TEI ODD class-spec mechanism).
// We do NOT extend IClass here because IClass carries the full UML 2.5.1
// structural surface (~60 owned attributes); TEI elements are slim, schema-
// derived projections that consumers wire onto a UML model on demand.
import type { IClass as _UmlClass } from '@amlhubs/uml';

/**
 * Common base interface for every TEI P5 element metaclass surfaced by this
 * package. Each TEI element projects to a UML `IClass` instance (see the
 * type-only `_UmlClass` import above) extended with the structural positions
 * every TEI element occupies (TEI namespace, ident, module name).
 *
 * @standard TEI P5 4.11.0
 * @section §1.3 — A Gentle Introduction to XML; §1.4 — TEI Reference Documents
 * @projectsTo UML IClass (CMOF Kernel, §9.2)
 * @ownedAttribute readonly elementId : string — TEI's `xml:id` (att.global, §1.3.1.1)
 * @ownedAttribute readonly ident : string — element generic identifier (`gi`)
 * @ownedAttribute readonly module : string — TEI module owning the element
 * @ownedAttribute readonly name : string — printable element name
 * @ownedAttribute readonly isAbstract : boolean — whether the metaclass is abstract
 */
export interface ITeiElement {
  readonly elementId: string;
  readonly ident: string;
  readonly module: string;
  readonly name: string;
  readonly isAbstract: boolean;
}

// Discard the type-only import of `_UmlClass` from runtime emit by referencing
// it in a phantom symbol — confirms the structural projection contract.
export type TeiElementProjection = _UmlClass;

/**
 * @standard TEI P5 4.11.0
 * @section §5 — Characters, Glyphs, and Writing Modes
 * @generalization ITeiElement
 */
export interface ITeiGaijiElement<TIdent extends string = string> extends ITeiElement {
  readonly module: 'gaiji';
  readonly ident: TIdent;
}

export abstract class AbstractTeiGaijiElement<const TIdent extends string = string>
  implements ITeiGaijiElement<TIdent>
{
  abstract readonly elementId: string;
  abstract readonly ident: TIdent;
  readonly module: 'gaiji' = 'gaiji';
  abstract readonly name: string;
  abstract readonly isAbstract: boolean;
}

/**
 * `<g>` — Gaiji character or glyph reference.
 *
 * @standard TEI P5 4.11.0
 * @section §5.2 — Markup Constructs for Representation of Characters and Glyphs
 * @element g
 * @definition represents a glyph, or a non-standard character.
 * @attributes @ref — points to a `<char>` or `<glyph>` declaration in `<charDecl>`.
 * @content character data
 * @constraints It is obligatory that `<g>` carries either a `@ref` attribute or character-data content (or both).
 */
export interface IG extends ITeiGaijiElement<'g'> {
  readonly ident: 'g';
}
export abstract class AbstractG extends AbstractTeiGaijiElement<'g'> implements IG {
  override readonly ident: 'g' = 'g';
}
export class G extends AbstractG {
  override readonly elementId: string = 'TEI_g';
  override readonly name: string = 'g';
  override readonly isAbstract: boolean = false;
}

/**
 * `<char>` — Character declaration in a TEI character-declaration block.
 *
 * @standard TEI P5 4.11.0
 * @section §5.2.1 — Character and Glyph Declarations
 * @element char
 * @definition provides descriptive information about a character.
 * @content `<charName>`, `<charProp>`, `<unicodeProp>`, `<unihanProp>`, `<localProp>`, `<mapping>`, `<figure>`, `<graphic>`, `<note>`, `<desc>`
 * @constraints It is obligatory that `<char>` is contained within a `<charDecl>` element.
 */
export interface IChar extends ITeiGaijiElement<'char'> {
  readonly ident: 'char';
}
export abstract class AbstractChar extends AbstractTeiGaijiElement<'char'> implements IChar {
  override readonly ident: 'char' = 'char';
}
export class Char extends AbstractChar {
  override readonly elementId: string = 'TEI_char';
  override readonly name: string = 'char';
  override readonly isAbstract: boolean = false;
}

/**
 * `<charDecl>` — Character-declaration block.
 *
 * @standard TEI P5 4.11.0
 * @section §5.2 — Markup Constructs for Representation of Characters and Glyphs
 * @element charDecl
 * @definition provides information about non-standard characters and glyphs.
 * @content `<desc>`, `<char>`, `<glyph>`
 * @constraints It is obligatory that `<charDecl>` is contained within `<encodingDesc>` of a `<teiHeader>`.
 */
export interface ICharDecl extends ITeiGaijiElement<'charDecl'> {
  readonly ident: 'charDecl';
}
export abstract class AbstractCharDecl extends AbstractTeiGaijiElement<'charDecl'> implements ICharDecl {
  override readonly ident: 'charDecl' = 'charDecl';
}
export class CharDecl extends AbstractCharDecl {
  override readonly elementId: string = 'TEI_charDecl';
  override readonly name: string = 'charDecl';
  override readonly isAbstract: boolean = false;
}

/**
 * `<glyph>` — Glyph declaration in a TEI character-declaration block.
 *
 * @standard TEI P5 4.11.0
 * @section §5.2.1 — Character and Glyph Declarations
 * @element glyph
 * @definition provides descriptive information about a glyph or a non-standard character.
 * @content `<glyphName>`, `<charProp>`, `<unicodeProp>`, `<unihanProp>`, `<localProp>`, `<mapping>`, `<figure>`, `<graphic>`, `<note>`, `<desc>`
 * @constraints It is obligatory that `<glyph>` is contained within a `<charDecl>` element.
 */
export interface IGlyph extends ITeiGaijiElement<'glyph'> {
  readonly ident: 'glyph';
}
export abstract class AbstractGlyph extends AbstractTeiGaijiElement<'glyph'> implements IGlyph {
  override readonly ident: 'glyph' = 'glyph';
}
export class Glyph extends AbstractGlyph {
  override readonly elementId: string = 'TEI_glyph';
  override readonly name: string = 'glyph';
  override readonly isAbstract: boolean = false;
}

/**
 * `<mapping>` — Character or glyph mapping to a target representation.
 *
 * @standard TEI P5 4.11.0
 * @section §5.2.2 — Mappings
 * @element mapping
 * @definition contains one or more characters which are related to the parent character or glyph in some respect, as specified by the `@type` attribute.
 * @attributes @type, @subtype, @target
 * @constraints It is obligatory that `<mapping>` is contained within a `<char>` or `<glyph>` element.
 */
export interface IMapping extends ITeiGaijiElement<'mapping'> {
  readonly ident: 'mapping';
}
export abstract class AbstractMapping extends AbstractTeiGaijiElement<'mapping'> implements IMapping {
  override readonly ident: 'mapping' = 'mapping';
}
export class Mapping extends AbstractMapping {
  override readonly elementId: string = 'TEI_mapping';
  override readonly name: string = 'mapping';
  override readonly isAbstract: boolean = false;
}

// ─── NamesDates module (TEI P5 §13) ────────────────────────────────────────

/**
 * @standard TEI P5 4.11.0
 * @section §13 — Names, Dates, People, and Places
 * @generalization ITeiElement
 */
export interface ITeiNamesDatesElement<TIdent extends string = string> extends ITeiElement {
  readonly module: 'namesdates';
  readonly ident: TIdent;
}

export abstract class AbstractTeiNamesDatesElement<const TIdent extends string = string>
  implements ITeiNamesDatesElement<TIdent>
{
  abstract readonly elementId: string;
  abstract readonly ident: TIdent;
  readonly module: 'namesdates' = 'namesdates';
  abstract readonly name: string;
  abstract readonly isAbstract: boolean;
}

/**
 * `<name>` — Generic proper-noun name.
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.1 — Personal Names
 * @element name
 * @definition contains a proper noun or noun phrase.
 * @attributes @type, @ref, @nymRef, @key, @role
 * @content character data, model.gLike, model.phrase, model.global
 */
export interface IName extends ITeiNamesDatesElement<'name'> {
  readonly ident: 'name';
}
export abstract class AbstractName extends AbstractTeiNamesDatesElement<'name'> implements IName {
  override readonly ident: 'name' = 'name';
}
export class Name extends AbstractName {
  override readonly elementId: string = 'TEI_name';
  override readonly name: string = 'name';
  override readonly isAbstract: boolean = false;
}

/**
 * `<persName>` — Personal name.
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.1 — Personal Names
 * @element persName
 * @definition contains a proper noun or proper-noun phrase referring to a person, possibly including any or all of the person's forenames, surnames, honorifics, added names, etc.
 * @attributes @type, @full, @sort
 * @content `<foreName>`, `<surname>`, `<roleName>`, `<addName>`, `<nameLink>`, `<genName>`
 */
export interface IPersName extends ITeiNamesDatesElement<'persName'> {
  readonly ident: 'persName';
}
export abstract class AbstractPersName extends AbstractTeiNamesDatesElement<'persName'> implements IPersName {
  override readonly ident: 'persName' = 'persName';
}
export class PersName extends AbstractPersName {
  override readonly elementId: string = 'TEI_persName';
  override readonly name: string = 'persName';
  override readonly isAbstract: boolean = false;
}

/**
 * `<placeName>` — Place name.
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.3 — Place Names
 * @element placeName
 * @definition contains an absolute or relative place name.
 * @attributes @type, @ref, @key
 * @content `<country>`, `<region>`, `<settlement>`, `<geogName>`, `<bloc>`, `<district>`
 */
export interface IPlaceName extends ITeiNamesDatesElement<'placeName'> {
  readonly ident: 'placeName';
}
export abstract class AbstractPlaceName extends AbstractTeiNamesDatesElement<'placeName'> implements IPlaceName {
  override readonly ident: 'placeName' = 'placeName';
}
export class PlaceName extends AbstractPlaceName {
  override readonly elementId: string = 'TEI_placeName';
  override readonly name: string = 'placeName';
  override readonly isAbstract: boolean = false;
}

/**
 * `<orgName>` — Organisation name.
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.2 — Organizational Names
 * @element orgName
 * @definition contains an organizational name identifying an institution.
 * @attributes @type, @ref, @key, @role
 * @content character data, model.nameLike
 */
export interface IOrgName extends ITeiNamesDatesElement<'orgName'> {
  readonly ident: 'orgName';
}
export abstract class AbstractOrgName extends AbstractTeiNamesDatesElement<'orgName'> implements IOrgName {
  override readonly ident: 'orgName' = 'orgName';
}
export class OrgName extends AbstractOrgName {
  override readonly elementId: string = 'TEI_orgName';
  override readonly name: string = 'orgName';
  override readonly isAbstract: boolean = false;
}

/**
 * `<foreName>` — Forename component of a personal name.
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.1 — Personal Names
 * @element foreName
 * @definition contains a forename, given or baptismal name.
 * @attributes @type, @full, @sort
 */
export interface IForeName extends ITeiNamesDatesElement<'foreName'> {
  readonly ident: 'foreName';
}
export abstract class AbstractForeName extends AbstractTeiNamesDatesElement<'foreName'> implements IForeName {
  override readonly ident: 'foreName' = 'foreName';
}
export class ForeName extends AbstractForeName {
  override readonly elementId: string = 'TEI_foreName';
  override readonly name: string = 'foreName';
  override readonly isAbstract: boolean = false;
}

/**
 * `<surname>` — Surname component of a personal name.
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.1 — Personal Names
 * @element surname
 * @definition contains a family (inherited) name, as opposed to a given, baptismal, or nick name.
 * @attributes @type, @sort
 */
export interface ISurname extends ITeiNamesDatesElement<'surname'> {
  readonly ident: 'surname';
}
export abstract class AbstractSurname extends AbstractTeiNamesDatesElement<'surname'> implements ISurname {
  override readonly ident: 'surname' = 'surname';
}
export class Surname extends AbstractSurname {
  override readonly elementId: string = 'TEI_surname';
  override readonly name: string = 'surname';
  override readonly isAbstract: boolean = false;
}

/**
 * `<roleName>` — Role name component of a personal name (titles, ranks).
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.1 — Personal Names
 * @element roleName
 * @definition contains a name component which indicates that the referent has a particular role or position in society, such as an official title or rank.
 * @attributes @type, @full, @sort
 */
export interface IRoleName extends ITeiNamesDatesElement<'roleName'> {
  readonly ident: 'roleName';
}
export abstract class AbstractRoleName extends AbstractTeiNamesDatesElement<'roleName'> implements IRoleName {
  override readonly ident: 'roleName' = 'roleName';
}
export class RoleName extends AbstractRoleName {
  override readonly elementId: string = 'TEI_roleName';
  override readonly name: string = 'roleName';
  override readonly isAbstract: boolean = false;
}

/**
 * `<addName>` — Additional name component (epithet, byname, nickname).
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.1 — Personal Names
 * @element addName
 * @definition contains an additional name component, such as a nickname, epithet, or alias, or any other descriptive phrase used within a personal name.
 * @attributes @type
 */
export interface IAddName extends ITeiNamesDatesElement<'addName'> {
  readonly ident: 'addName';
}
export abstract class AbstractAddName extends AbstractTeiNamesDatesElement<'addName'> implements IAddName {
  override readonly ident: 'addName' = 'addName';
}
export class AddName extends AbstractAddName {
  override readonly elementId: string = 'TEI_addName';
  override readonly name: string = 'addName';
  override readonly isAbstract: boolean = false;
}

/**
 * `<country>` — Country-level place name.
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.3 — Place Names
 * @element country
 * @definition contains the name of a geo-political unit, such as a nation, country, colony, or commonwealth, larger than or administratively superior to a region and smaller than a bloc.
 * @attributes @key, @ref
 */
export interface ICountry extends ITeiNamesDatesElement<'country'> {
  readonly ident: 'country';
}
export abstract class AbstractCountry extends AbstractTeiNamesDatesElement<'country'> implements ICountry {
  override readonly ident: 'country' = 'country';
}
export class Country extends AbstractCountry {
  override readonly elementId: string = 'TEI_country';
  override readonly name: string = 'country';
  override readonly isAbstract: boolean = false;
}

/**
 * `<region>` — Sub-national region place name.
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.3 — Place Names
 * @element region
 * @definition contains the name of an administrative unit such as a state, province, or county, larger than a settlement, but smaller than a country.
 * @attributes @key, @ref, @type
 */
export interface IRegion extends ITeiNamesDatesElement<'region'> {
  readonly ident: 'region';
}
export abstract class AbstractRegion extends AbstractTeiNamesDatesElement<'region'> implements IRegion {
  override readonly ident: 'region' = 'region';
}
export class Region extends AbstractRegion {
  override readonly elementId: string = 'TEI_region';
  override readonly name: string = 'region';
  override readonly isAbstract: boolean = false;
}

/**
 * `<settlement>` — Settlement-level place name (city, town, village).
 *
 * @standard TEI P5 4.11.0
 * @section §13.2.3 — Place Names
 * @element settlement
 * @definition contains the name of a settlement such as a city, town, or village identified as a single geo-political or administrative unit.
 * @attributes @key, @ref, @type
 */
export interface ISettlement extends ITeiNamesDatesElement<'settlement'> {
  readonly ident: 'settlement';
}
export abstract class AbstractSettlement extends AbstractTeiNamesDatesElement<'settlement'> implements ISettlement {
  override readonly ident: 'settlement' = 'settlement';
}
export class Settlement extends AbstractSettlement {
  override readonly elementId: string = 'TEI_settlement';
  override readonly name: string = 'settlement';
  override readonly isAbstract: boolean = false;
}

/**
 * `<geo>` — Geographical coordinates.
 *
 * @standard TEI P5 4.11.0
 * @section §13.3.4.1 — Varieties of Location
 * @element geo
 * @definition contains a sequence of two or three coordinate values denoting a geographic location.
 * @attributes @decls
 * @content character data (whitespace-separated coordinate values)
 */
export interface IGeo extends ITeiNamesDatesElement<'geo'> {
  readonly ident: 'geo';
}
export abstract class AbstractGeo extends AbstractTeiNamesDatesElement<'geo'> implements IGeo {
  override readonly ident: 'geo' = 'geo';
}
export class Geo extends AbstractGeo {
  override readonly elementId: string = 'TEI_geo';
  override readonly name: string = 'geo';
  override readonly isAbstract: boolean = false;
}

// ───────────────────────────────────────────────────────────────────────────
// WAVE 2 — DICTIONARIES MODULE (TEI P5 §9)
// ───────────────────────────────────────────────────────────────────────────
//
// Dictionaries provides the structured-entry vocabulary for representing
// printed and machine-readable dictionaries: lemmas (`<form>`/`<orth>`),
// pronunciation (`<pron>`), grammatical information (`<gramGrp>`), word
// senses (`<sense>`), definitions (`<def>`), citations (`<cit>`/`<quote>`),
// usage (`<usg>`), related entries (`<re>`) and cross-references (`<xr>`).

/**
 * @standard TEI P5 4.11.0
 * @section §9 — Dictionaries
 * @generalization ITeiElement
 */
export interface ITeiDictionariesElement<TIdent extends string = string> extends ITeiElement {
  readonly module: 'dictionaries';
  readonly ident: TIdent;
}

export abstract class AbstractTeiDictionariesElement<const TIdent extends string = string>
  implements ITeiDictionariesElement<TIdent>
{
  abstract readonly elementId: string;
  abstract readonly ident: TIdent;
  readonly module: 'dictionaries' = 'dictionaries';
  abstract readonly name: string;
  abstract readonly isAbstract: boolean;
}

/**
 * `<entry>` — Dictionary entry.
 *
 * @standard TEI P5 4.11.0
 * @section §9.1 — Dictionary Body and Overall Structure
 * @element entry
 * @definition contains a single structured entry in any kind of lexical resource, such as a dictionary or lexicon.
 * @attributes @sortKey (att.sortable), att.global, att.entryLike
 * @content `<hom>`, `<sense>`, `<pc>`, model.entryPart.top, model.global, model.ptrLike (one or more)
 * @constraints It is recommended to use `<sense>` even for an entry that has only one sense, to group together all parts of the definition relating to the word sense.
 */
export interface IEntry extends ITeiDictionariesElement<'entry'> {
  readonly ident: 'entry';
}
export abstract class AbstractEntry extends AbstractTeiDictionariesElement<'entry'> implements IEntry {
  override readonly ident: 'entry' = 'entry';
}
export class Entry extends AbstractEntry {
  override readonly elementId: string = 'TEI_entry';
  override readonly name: string = 'entry';
  override readonly isAbstract: boolean = false;
}

/**
 * `<form>` — Form-information group inside a dictionary entry.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.1 — Information on the Form of a Dictionary Entry
 * @element form
 * @definition groups all the information on the written and spoken forms of one headword.
 * @attributes @type (lemma, lemma-extension, variant, inflected, phrase, multiword, hyphenation, dict, simple)
 * @content `<orth>`, `<pron>`, `<hyph>`, `<syll>`, `<stress>`, `<lbl>`, `<pRef>`, `<form>`
 */
export interface IForm extends ITeiDictionariesElement<'form'> {
  readonly ident: 'form';
}
export abstract class AbstractForm extends AbstractTeiDictionariesElement<'form'> implements IForm {
  override readonly ident: 'form' = 'form';
}
export class Form extends AbstractForm {
  override readonly elementId: string = 'TEI_form';
  override readonly name: string = 'form';
  override readonly isAbstract: boolean = false;
}

/**
 * `<orth>` — Orthographic form.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.1 — Information on the Form of a Dictionary Entry
 * @element orth
 * @definition gives the orthographic form of a dictionary headword.
 * @attributes @type, @extent (att.lexicographic)
 * @content character data, `<seg>`, model.gLike
 */
export interface IOrth extends ITeiDictionariesElement<'orth'> {
  readonly ident: 'orth';
}
export abstract class AbstractOrth extends AbstractTeiDictionariesElement<'orth'> implements IOrth {
  override readonly ident: 'orth' = 'orth';
}
export class Orth extends AbstractOrth {
  override readonly elementId: string = 'TEI_orth';
  override readonly name: string = 'orth';
  override readonly isAbstract: boolean = false;
}

/**
 * `<pron>` — Pronunciation.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.1.2 — Pronunciation
 * @element pron
 * @definition contains the pronunciation(s) of the word.
 * @attributes @notation, @extent
 * @content character data
 */
export interface IPron extends ITeiDictionariesElement<'pron'> {
  readonly ident: 'pron';
}
export abstract class AbstractPron extends AbstractTeiDictionariesElement<'pron'> implements IPron {
  override readonly ident: 'pron' = 'pron';
}
export class Pron extends AbstractPron {
  override readonly elementId: string = 'TEI_pron';
  override readonly name: string = 'pron';
  override readonly isAbstract: boolean = false;
}

/**
 * `<gramGrp>` — Grammatical information group.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.2 — Grammatical Information
 * @element gramGrp
 * @definition groups morpho-syntactic information about a lexical item, e.g. part of speech, gender, number.
 * @content `<gram>`, `<pos>`, `<subc>`, `<gen>`, `<number>`, `<case>`, `<per>`, `<tns>`, `<mood>`, `<iType>`
 */
export interface IGramGrp extends ITeiDictionariesElement<'gramGrp'> {
  readonly ident: 'gramGrp';
}
export abstract class AbstractGramGrp extends AbstractTeiDictionariesElement<'gramGrp'> implements IGramGrp {
  override readonly ident: 'gramGrp' = 'gramGrp';
}
export class GramGrp extends AbstractGramGrp {
  override readonly elementId: string = 'TEI_gramGrp';
  override readonly name: string = 'gramGrp';
  override readonly isAbstract: boolean = false;
}

/**
 * `<pos>` — Part of speech.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.2 — Grammatical Information
 * @element pos
 * @definition indicates the part of speech assigned to a dictionary headword.
 * @attributes @norm
 * @content character data
 */
export interface IPos extends ITeiDictionariesElement<'pos'> {
  readonly ident: 'pos';
}
export abstract class AbstractPos extends AbstractTeiDictionariesElement<'pos'> implements IPos {
  override readonly ident: 'pos' = 'pos';
}
export class Pos extends AbstractPos {
  override readonly elementId: string = 'TEI_pos';
  override readonly name: string = 'pos';
  override readonly isAbstract: boolean = false;
}

/**
 * `<gen>` — Grammatical gender.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.2 — Grammatical Information
 * @element gen
 * @definition identifies the morphological gender of a lexical item.
 * @attributes @value (e.g. m, f, n, c)
 * @content character data
 */
export interface IGen extends ITeiDictionariesElement<'gen'> {
  readonly ident: 'gen';
}
export abstract class AbstractGen extends AbstractTeiDictionariesElement<'gen'> implements IGen {
  override readonly ident: 'gen' = 'gen';
}
export class Gen extends AbstractGen {
  override readonly elementId: string = 'TEI_gen';
  override readonly name: string = 'gen';
  override readonly isAbstract: boolean = false;
}

/**
 * `<number>` — Grammatical number.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.2 — Grammatical Information
 * @element number
 * @definition indicates grammatical number associated with a form (singular, plural, dual...).
 * @attributes @value (sg, pl, du, etc.)
 */
export interface ITeiNumber extends ITeiDictionariesElement<'number'> {
  readonly ident: 'number';
}
export abstract class AbstractTeiNumber extends AbstractTeiDictionariesElement<'number'> implements ITeiNumber {
  override readonly ident: 'number' = 'number';
}
export class TeiNumber extends AbstractTeiNumber {
  override readonly elementId: string = 'TEI_number';
  override readonly name: string = 'number';
  override readonly isAbstract: boolean = false;
}

/**
 * `<case>` — Grammatical case.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.2 — Grammatical Information
 * @element case
 * @definition contains grammatical case information given by a dictionary for a given form.
 * @attributes @value (nom, acc, gen, dat, etc.)
 */
export interface ICase extends ITeiDictionariesElement<'case'> {
  readonly ident: 'case';
}
export abstract class AbstractCase extends AbstractTeiDictionariesElement<'case'> implements ICase {
  override readonly ident: 'case' = 'case';
}
export class Case extends AbstractCase {
  override readonly elementId: string = 'TEI_case';
  override readonly name: string = 'case';
  override readonly isAbstract: boolean = false;
}

/**
 * `<per>` — Grammatical person (Dictionaries module).
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.2 — Grammatical Information
 * @element per
 * @definition indicates grammatical person (1st, 2nd, 3rd, etc.) associated with a given inflected form in a dictionary.
 * @attributes @value
 * @note TEI uses `<per>` for grammatical person; the namesdates `<person>` is a distinct element.
 */
export interface IPerDict extends ITeiDictionariesElement<'per'> {
  readonly ident: 'per';
}
export abstract class AbstractPerDict extends AbstractTeiDictionariesElement<'per'> implements IPerDict {
  override readonly ident: 'per' = 'per';
}
export class PerDict extends AbstractPerDict {
  override readonly elementId: string = 'TEI_per_dict';
  override readonly name: string = 'per';
  override readonly isAbstract: boolean = false;
}

/**
 * `<mood>` — Grammatical mood.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.2 — Grammatical Information
 * @element mood
 * @definition contains information about the grammatical mood of verbs (e.g. indicative, subjunctive, imperative).
 * @attributes @value
 */
export interface IMood extends ITeiDictionariesElement<'mood'> {
  readonly ident: 'mood';
}
export abstract class AbstractMood extends AbstractTeiDictionariesElement<'mood'> implements IMood {
  override readonly ident: 'mood' = 'mood';
}
export class Mood extends AbstractMood {
  override readonly elementId: string = 'TEI_mood';
  override readonly name: string = 'mood';
  override readonly isAbstract: boolean = false;
}

/**
 * `<tns>` — Grammatical tense.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.2 — Grammatical Information
 * @element tns
 * @definition indicates the grammatical tense associated with a given inflected form in a dictionary.
 * @attributes @value
 * @note TEI uses `<tns>` (the standard element name); literature often refers to it as "tense".
 */
export interface ITns extends ITeiDictionariesElement<'tns'> {
  readonly ident: 'tns';
}
export abstract class AbstractTns extends AbstractTeiDictionariesElement<'tns'> implements ITns {
  override readonly ident: 'tns' = 'tns';
}
export class Tns extends AbstractTns {
  override readonly elementId: string = 'TEI_tns';
  override readonly name: string = 'tns';
  override readonly isAbstract: boolean = false;
}

/**
 * `<sense>` — Word sense in a dictionary entry.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.4 — Senses, Glosses, Definitions, and Examples
 * @element sense
 * @definition groups together all information relating to one word sense in a dictionary entry, for example definitions, examples, and translation equivalents.
 * @attributes @level (gives the nesting depth of this sense), att.global, att.lexicographic
 * @content character data, model.gLike, `<sense>` (recursive), model.entryPart.top, model.phrase, model.global
 */
export interface ISense extends ITeiDictionariesElement<'sense'> {
  readonly ident: 'sense';
}
export abstract class AbstractSense extends AbstractTeiDictionariesElement<'sense'> implements ISense {
  override readonly ident: 'sense' = 'sense';
}
export class Sense extends AbstractSense {
  override readonly elementId: string = 'TEI_sense';
  override readonly name: string = 'sense';
  override readonly isAbstract: boolean = false;
}

/**
 * `<def>` — Definition of a sense.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.4.1 — Definitions, Translations, and Glosses
 * @element def
 * @definition contains definitions or glosses for a sense in a dictionary entry.
 * @attributes att.global, att.lexicographic
 * @content character data, model.gLike, model.entryPart, model.phrase, model.global
 */
export interface IDef extends ITeiDictionariesElement<'def'> {
  readonly ident: 'def';
}
export abstract class AbstractDef extends AbstractTeiDictionariesElement<'def'> implements IDef {
  override readonly ident: 'def' = 'def';
}
export class Def extends AbstractDef {
  override readonly elementId: string = 'TEI_def';
  override readonly name: string = 'def';
  override readonly isAbstract: boolean = false;
}

/**
 * `<cit>` — Quotation/citation in a dictionary entry.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.5.1 — Citations and Examples
 * @element cit
 * @definition contains a quotation from some other document, together with a bibliographic reference to its source.
 * @attributes @type (translation, example, etymon...)
 * @content `<quote>`, `<bibl>`, `<author>`, `<date>`, `<gloss>`, `<def>`, model.global, model.ptrLike
 */
export interface ICit extends ITeiDictionariesElement<'cit'> {
  readonly ident: 'cit';
}
export abstract class AbstractCit extends AbstractTeiDictionariesElement<'cit'> implements ICit {
  override readonly ident: 'cit' = 'cit';
}
export class Cit extends AbstractCit {
  override readonly elementId: string = 'TEI_cit';
  override readonly name: string = 'cit';
  override readonly isAbstract: boolean = false;
}

/**
 * `<quote>` — Quoted passage.
 *
 * @standard TEI P5 4.11.0
 * @section §3.3.3 — Quotation; §9.3.5 — Citations and Examples (Dictionaries)
 * @element quote
 * @definition contains a phrase or passage attributed by the narrator or author to some agency external to the text.
 * @attributes @type, @rend, @rendition, @source
 * @content macro.specialPara
 * @note `<quote>` is shared across multiple modules — used inside `<cit>` for dictionary citations.
 */
export interface IQuote extends ITeiDictionariesElement<'quote'> {
  readonly ident: 'quote';
}
export abstract class AbstractQuote extends AbstractTeiDictionariesElement<'quote'> implements IQuote {
  override readonly ident: 'quote' = 'quote';
}
export class Quote extends AbstractQuote {
  override readonly elementId: string = 'TEI_quote';
  override readonly name: string = 'quote';
  override readonly isAbstract: boolean = false;
}

/**
 * `<usg>` — Usage label.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.5.4 — Usage Information
 * @element usg
 * @definition contains usage information in a dictionary entry.
 * @attributes @type (geo, time, dom, register, style, plev, hint, lang, gram...)
 * @content character data, model.gLike, model.phrase, model.global
 */
export interface IUsg extends ITeiDictionariesElement<'usg'> {
  readonly ident: 'usg';
}
export abstract class AbstractUsg extends AbstractTeiDictionariesElement<'usg'> implements IUsg {
  override readonly ident: 'usg' = 'usg';
}
export class Usg extends AbstractUsg {
  override readonly elementId: string = 'TEI_usg';
  override readonly name: string = 'usg';
  override readonly isAbstract: boolean = false;
}

/**
 * `<re>` — Related entry.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.6 — Related Entries
 * @element re
 * @definition contains a dictionary entry for a lexical item related to the headword, such as a compound phrase or derived form, embedded inside another entry.
 * @attributes @type
 * @content as `<entry>`
 */
export interface IRe extends ITeiDictionariesElement<'re'> {
  readonly ident: 're';
}
export abstract class AbstractRe extends AbstractTeiDictionariesElement<'re'> implements IRe {
  override readonly ident: 're' = 're';
}
export class Re extends AbstractRe {
  override readonly elementId: string = 'TEI_re';
  override readonly name: string = 're';
  override readonly isAbstract: boolean = false;
}

/**
 * `<xr>` — Cross-reference within a dictionary entry.
 *
 * @standard TEI P5 4.11.0
 * @section §9.3.5.3 — Cross-References
 * @element xr
 * @definition contains a cross-reference from one dictionary entry to another.
 * @attributes @type (etymon, syn, ant, see, deriv...)
 * @content character data, `<ref>`, `<ptr>`, model.entryPart, model.phrase, model.global
 */
export interface IXr extends ITeiDictionariesElement<'xr'> {
  readonly ident: 'xr';
}
export abstract class AbstractXr extends AbstractTeiDictionariesElement<'xr'> implements IXr {
  override readonly ident: 'xr' = 'xr';
}
export class Xr extends AbstractXr {
  override readonly elementId: string = 'TEI_xr';
  override readonly name: string = 'xr';
  override readonly isAbstract: boolean = false;
}

// ───────────────────────────────────────────────────────────────────────────
// WAVE 3 — LINGUISTICS MODULE (TEI P5 §18) + ANALYSIS MODULE (TEI P5 §17)
// ───────────────────────────────────────────────────────────────────────────
//
// Linguistics provides the simple analytic mechanisms — sentence segmentation
// (`<s>`), word tokenisation (`<w>`), character/punctuation segmentation
// (`<c>`/`<pc>`), spans (`<seg>`/`<span>`), interpretation pointers
// (`<interp>`/`<interpGrp>`). Analysis (§17) provides the attribute spine
// (@ana, @lemma, @msd) attached to all linguistics elements.

/**
 * @standard TEI P5 4.11.0
 * @section §18 — Simple Analytic Mechanisms (linguistics module); §17 — Linguistic Segment Categories and Alignment (analysis module)
 * @generalization ITeiElement
 */
export interface ITeiLinguisticsElement<TIdent extends string = string> extends ITeiElement {
  readonly module: 'linguistics' | 'analysis';
  readonly ident: TIdent;
}

export abstract class AbstractTeiLinguisticsElement<const TIdent extends string = string>
  implements ITeiLinguisticsElement<TIdent>
{
  abstract readonly elementId: string;
  abstract readonly ident: TIdent;
  abstract readonly module: 'linguistics' | 'analysis';
  abstract readonly name: string;
  abstract readonly isAbstract: boolean;
}

/**
 * `<s>` — Sentence-like unit.
 *
 * @standard TEI P5 4.11.0
 * @section §18.1 — Linguistic Segment Categories
 * @element s
 * @definition contains a sentence-like division of a text.
 * @attributes @ana (Analysis §17), @n, @subtype, @type
 * @content character data, model.segLike, model.phrase, model.inter, model.global
 * @constraints It is prohibited that `<s>` elements nest one inside another.
 */
export interface IS extends ITeiLinguisticsElement<'s'> {
  readonly ident: 's';
  readonly module: 'linguistics';
}
export abstract class AbstractS extends AbstractTeiLinguisticsElement<'s'> implements IS {
  override readonly ident: 's' = 's';
  override readonly module: 'linguistics' = 'linguistics';
}
export class S extends AbstractS {
  override readonly elementId: string = 'TEI_s';
  override readonly name: string = 's';
  override readonly isAbstract: boolean = false;
}

/**
 * `<w>` — Word-like unit (token).
 *
 * @standard TEI P5 4.11.0
 * @section §18.1 — Linguistic Segment Categories
 * @element w
 * @definition represents a grammatical (not necessarily orthographic) word.
 * @attributes @lemma (Analysis §17.4.2), @lemmaRef, @msd (Analysis §17.4.3), @ana, @pos, @join, @type
 * @content character data, model.gLike, `<c>`, `<pc>`, `<m>`, `<w>` (recursive), `<seg>`
 */
export interface IW extends ITeiLinguisticsElement<'w'> {
  readonly ident: 'w';
  readonly module: 'linguistics';
}
export abstract class AbstractW extends AbstractTeiLinguisticsElement<'w'> implements IW {
  override readonly ident: 'w' = 'w';
  override readonly module: 'linguistics' = 'linguistics';
}
export class W extends AbstractW {
  override readonly elementId: string = 'TEI_w';
  override readonly name: string = 'w';
  override readonly isAbstract: boolean = false;
}

/**
 * `<c>` — Single character.
 *
 * @standard TEI P5 4.11.0
 * @section §18.1 — Linguistic Segment Categories
 * @element c
 * @definition represents a character.
 * @attributes @ana, @type
 * @content character data
 */
export interface IC extends ITeiLinguisticsElement<'c'> {
  readonly ident: 'c';
  readonly module: 'linguistics';
}
export abstract class AbstractC extends AbstractTeiLinguisticsElement<'c'> implements IC {
  override readonly ident: 'c' = 'c';
  override readonly module: 'linguistics' = 'linguistics';
}
export class C extends AbstractC {
  override readonly elementId: string = 'TEI_c';
  override readonly name: string = 'c';
  override readonly isAbstract: boolean = false;
}

/**
 * `<pc>` — Punctuation character.
 *
 * @standard TEI P5 4.11.0
 * @section §18.1.1 — Words and Above
 * @element pc
 * @definition contains a character classified as a punctuation mark.
 * @attributes @force (strong, weak, inter), @unit, @pre, @ana
 * @content character data
 */
export interface IPc extends ITeiLinguisticsElement<'pc'> {
  readonly ident: 'pc';
  readonly module: 'linguistics';
}
export abstract class AbstractPc extends AbstractTeiLinguisticsElement<'pc'> implements IPc {
  override readonly ident: 'pc' = 'pc';
  override readonly module: 'linguistics' = 'linguistics';
}
export class Pc extends AbstractPc {
  override readonly elementId: string = 'TEI_pc';
  override readonly name: string = 'pc';
  override readonly isAbstract: boolean = false;
}

/**
 * `<seg>` — Arbitrary text segment.
 *
 * @standard TEI P5 4.11.0
 * @section §17.3 — Spans and Interpretations; §16.3 — Blocks, Segments, and Anchors
 * @element seg
 * @definition contains any arbitrary segment of text below the chunk level, especially for analytic purposes.
 * @attributes @ana, @part, @type, @subtype, @function
 * @content character data, model.gLike, model.segLike, model.phrase, model.inter, model.global
 */
export interface ISeg extends ITeiLinguisticsElement<'seg'> {
  readonly ident: 'seg';
  readonly module: 'linguistics';
}
export abstract class AbstractSeg extends AbstractTeiLinguisticsElement<'seg'> implements ISeg {
  override readonly ident: 'seg' = 'seg';
  override readonly module: 'linguistics' = 'linguistics';
}
export class Seg extends AbstractSeg {
  override readonly elementId: string = 'TEI_seg';
  override readonly name: string = 'seg';
  override readonly isAbstract: boolean = false;
}

/**
 * `<span>` — Span over a stretch of text.
 *
 * @standard TEI P5 4.11.0
 * @section §17.3 — Spans and Interpretations
 * @element span
 * @definition associates an interpretative annotation directly with a span of text.
 * @attributes @target, @from, @to, @ana, @resp, @inst
 * @content macro.specialPara
 */
export interface ISpan extends ITeiLinguisticsElement<'span'> {
  readonly ident: 'span';
  readonly module: 'analysis';
}
export abstract class AbstractSpan extends AbstractTeiLinguisticsElement<'span'> implements ISpan {
  override readonly ident: 'span' = 'span';
  override readonly module: 'analysis' = 'analysis';
}
export class Span extends AbstractSpan {
  override readonly elementId: string = 'TEI_span';
  override readonly name: string = 'span';
  override readonly isAbstract: boolean = false;
}

/**
 * `<spanGrp>` — Group of `<span>` elements sharing a common annotation type.
 *
 * @standard TEI P5 4.11.0
 * @section §17.3 — Spans and Interpretations
 * @element spanGrp
 * @definition collects together `<span>` tags.
 * @attributes @type, @ana, @resp
 * @content `<span>` (one or more)
 */
export interface ISpanGrp extends ITeiLinguisticsElement<'spanGrp'> {
  readonly ident: 'spanGrp';
  readonly module: 'analysis';
}
export abstract class AbstractSpanGrp extends AbstractTeiLinguisticsElement<'spanGrp'> implements ISpanGrp {
  override readonly ident: 'spanGrp' = 'spanGrp';
  override readonly module: 'analysis' = 'analysis';
}
export class SpanGrp extends AbstractSpanGrp {
  override readonly elementId: string = 'TEI_spanGrp';
  override readonly name: string = 'spanGrp';
  override readonly isAbstract: boolean = false;
}

/**
 * `<interp>` — Interpretation.
 *
 * @standard TEI P5 4.11.0
 * @section §17.3 — Spans and Interpretations
 * @element interp
 * @definition summarizes a specific interpretative annotation which can be linked to a span of text.
 * @attributes @type, @inst, @resp
 * @content macro.phraseSeq.limited
 */
export interface IInterp extends ITeiLinguisticsElement<'interp'> {
  readonly ident: 'interp';
  readonly module: 'analysis';
}
export abstract class AbstractInterp extends AbstractTeiLinguisticsElement<'interp'> implements IInterp {
  override readonly ident: 'interp' = 'interp';
  override readonly module: 'analysis' = 'analysis';
}
export class Interp extends AbstractInterp {
  override readonly elementId: string = 'TEI_interp';
  override readonly name: string = 'interp';
  override readonly isAbstract: boolean = false;
}

/**
 * `<interpGrp>` — Group of `<interp>` elements sharing a common annotation type.
 *
 * @standard TEI P5 4.11.0
 * @section §17.3 — Spans and Interpretations
 * @element interpGrp
 * @definition collects together a set of related interpretations which share responsibility or type.
 * @attributes @type, @resp
 * @content `<desc>`, `<interp>` (one or more)
 */
export interface IInterpGrp extends ITeiLinguisticsElement<'interpGrp'> {
  readonly ident: 'interpGrp';
  readonly module: 'analysis';
}
export abstract class AbstractInterpGrp extends AbstractTeiLinguisticsElement<'interpGrp'> implements IInterpGrp {
  override readonly ident: 'interpGrp' = 'interpGrp';
  override readonly module: 'analysis' = 'analysis';
}
export class InterpGrp extends AbstractInterpGrp {
  override readonly elementId: string = 'TEI_interpGrp';
  override readonly name: string = 'interpGrp';
  override readonly isAbstract: boolean = false;
}

// ─── Analysis-module attribute surface (TEI P5 §17.4) ──────────────────────
//
// The `@ana`, `@lemma`, `@lemmaRef`, `@msd` attributes form the linguistic-
// analysis attribute spine. They are not elements; they are attribute classes
// (`att.linguistic`, `att.global.analytic`) that decorate elements such as
// `<s>`, `<w>`, `<c>`, `<pc>`, `<seg>`, `<span>`. The TEI P5 §17.4 spec
// defines them; consumers wire them onto element instances at runtime.
//
// We surface them here as a typed attribute-bag interface so that consumers
// authoring TEI documents in TypeScript can attach the analysis spine in a
// type-checked way.

/**
 * Linguistic-analysis attribute bag (TEI P5 §17.4 / att.linguistic).
 *
 * @standard TEI P5 4.11.0
 * @section §17.4 — Linguistic Analysis Attributes
 * @attribute @ana — points to one or more elements containing interpretations of the element on which the @ana attribute appears.
 * @attribute @lemma — provides a lemma (base form) for the word, using the same writing system as the orthographic form.
 * @attribute @lemmaRef — provides a pointer to a definition of the lemma for the word, in a dictionary or other resource (e.g. a URI).
 * @attribute @msd — provides morphosyntactic-description information for a word (POS tag plus morphological features).
 * @attribute @pos — indicates the part of speech assigned to a token.
 */
export interface ITeiLinguisticAnalysisAttributes {
  readonly ana?: ReadonlyArray<string>;
  readonly lemma?: string;
  readonly lemmaRef?: string;
  readonly msd?: string;
  readonly pos?: string;
}

// ───────────────────────────────────────────────────────────────────────────
// WAVE 4 — CORPUS MODULE (TEI P5 §16) — linguistic-metadata subset
// ───────────────────────────────────────────────────────────────────────────
//
// Corpus provides the structural vocabulary for representing language
// corpora and their metadata. v0.0.1 surfaces only the linguistic-metadata
// subset of `<teiHeader>` plus the description blocks needed to characterise
// participants, settings, and the languages used.

/**
 * @standard TEI P5 4.11.0
 * @section §16 — Language Corpora
 * @generalization ITeiElement
 */
export interface ITeiCorpusElement<TIdent extends string = string> extends ITeiElement {
  readonly module: 'corpus' | 'header';
  readonly ident: TIdent;
}

export abstract class AbstractTeiCorpusElement<const TIdent extends string = string>
  implements ITeiCorpusElement<TIdent>
{
  abstract readonly elementId: string;
  abstract readonly ident: TIdent;
  abstract readonly module: 'corpus' | 'header';
  abstract readonly name: string;
  abstract readonly isAbstract: boolean;
}

/**
 * `<teiHeader>` — TEI document header.
 *
 * @standard TEI P5 4.11.0
 * @section §2 — The TEI Header
 * @element teiHeader
 * @definition supplies the descriptive and declarative information making up an electronic title page prefixed to every TEI-conformant text.
 * @attributes @type
 * @content `<fileDesc>`, `<encodingDesc>`, `<profileDesc>`, `<xenoData>`, `<revisionDesc>`
 * @scope Linguistic-subset surface — for v0.0.1 we expose `<teiHeader>` itself plus the linguistically-relevant `<profileDesc>` children (`<textDesc>`, `<particDesc>`, `<settingDesc>`, `<langUsage>`/`<language>`); non-linguistic header parts (`<fileDesc>`, `<encodingDesc>`, `<revisionDesc>`) are deferred.
 */
export interface ITeiHeader extends ITeiCorpusElement<'teiHeader'> {
  readonly ident: 'teiHeader';
  readonly module: 'header';
}
export abstract class AbstractTeiHeader extends AbstractTeiCorpusElement<'teiHeader'> implements ITeiHeader {
  override readonly ident: 'teiHeader' = 'teiHeader';
  override readonly module: 'header' = 'header';
}
export class TeiHeader extends AbstractTeiHeader {
  override readonly elementId: string = 'TEI_teiHeader';
  override readonly name: string = 'teiHeader';
  override readonly isAbstract: boolean = false;
}

/**
 * `<textDesc>` — Description of the text's situational characteristics.
 *
 * @standard TEI P5 4.11.0
 * @section §16.2.1 — The Text Description
 * @element textDesc
 * @definition provides a description of a text in terms of its situational parameters.
 * @attributes @n
 * @content `<channel>`, `<constitution>`, `<derivation>`, `<domain>`, `<factuality>`, `<interaction>`, `<preparedness>`, `<purpose>`
 */
export interface ITextDesc extends ITeiCorpusElement<'textDesc'> {
  readonly ident: 'textDesc';
  readonly module: 'corpus';
}
export abstract class AbstractTextDesc extends AbstractTeiCorpusElement<'textDesc'> implements ITextDesc {
  override readonly ident: 'textDesc' = 'textDesc';
  override readonly module: 'corpus' = 'corpus';
}
export class TextDesc extends AbstractTextDesc {
  override readonly elementId: string = 'TEI_textDesc';
  override readonly name: string = 'textDesc';
  override readonly isAbstract: boolean = false;
}

/**
 * `<particDesc>` — Participant description.
 *
 * @standard TEI P5 4.11.0
 * @section §16.2.2 — The Participant Description
 * @element particDesc
 * @definition describes the identifiable speakers, voices, or other participants in any kind of text or other persons named or otherwise referred to in a text, edition, or metadata.
 * @content `<p>`, `<listPerson>`, `<person>`, `<personGrp>`, `<relation>`, `<relationGrp>`
 */
export interface IParticDesc extends ITeiCorpusElement<'particDesc'> {
  readonly ident: 'particDesc';
  readonly module: 'corpus';
}
export abstract class AbstractParticDesc extends AbstractTeiCorpusElement<'particDesc'> implements IParticDesc {
  override readonly ident: 'particDesc' = 'particDesc';
  override readonly module: 'corpus' = 'corpus';
}
export class ParticDesc extends AbstractParticDesc {
  override readonly elementId: string = 'TEI_particDesc';
  override readonly name: string = 'particDesc';
  override readonly isAbstract: boolean = false;
}

/**
 * `<settingDesc>` — Description of setting.
 *
 * @standard TEI P5 4.11.0
 * @section §16.2.3 — The Setting Description
 * @element settingDesc
 * @definition describes the setting or settings within which a language interaction takes place.
 * @content `<p>`, `<setting>`, `<listPlace>`, `<place>`
 */
export interface ISettingDesc extends ITeiCorpusElement<'settingDesc'> {
  readonly ident: 'settingDesc';
  readonly module: 'corpus';
}
export abstract class AbstractSettingDesc extends AbstractTeiCorpusElement<'settingDesc'> implements ISettingDesc {
  override readonly ident: 'settingDesc' = 'settingDesc';
  override readonly module: 'corpus' = 'corpus';
}
export class SettingDesc extends AbstractSettingDesc {
  override readonly elementId: string = 'TEI_settingDesc';
  override readonly name: string = 'settingDesc';
  override readonly isAbstract: boolean = false;
}

/**
 * `<person>` — Person description.
 *
 * @standard TEI P5 4.11.0
 * @section §13.3.2 — The Person Element; §16.2.2 — The Participant Description
 * @element person
 * @definition provides information about an identifiable individual.
 * @attributes @sex, @age, @role, @ana
 * @content `<persName>`, `<birth>`, `<death>`, `<bibl>`, `<langKnowledge>`, `<idno>`, `<note>`, `<event>`, `<state>`, `<trait>`
 * @note Participants in a corpus are encoded as `<person>` elements within `<particDesc>`.
 */
export interface IPerson extends ITeiCorpusElement<'person'> {
  readonly ident: 'person';
  readonly module: 'corpus';
}
export abstract class AbstractPerson extends AbstractTeiCorpusElement<'person'> implements IPerson {
  override readonly ident: 'person' = 'person';
  override readonly module: 'corpus' = 'corpus';
}
export class Person extends AbstractPerson {
  override readonly elementId: string = 'TEI_person';
  override readonly name: string = 'person';
  override readonly isAbstract: boolean = false;
}

/**
 * `<personGrp>` — Group of persons.
 *
 * @standard TEI P5 4.11.0
 * @section §16.2.2 — The Participant Description
 * @element personGrp
 * @definition describes a group of individuals treated as a single participant in a corpus.
 * @attributes @role, @size
 * @content `<persName>`, `<note>`
 */
export interface IPersonGrp extends ITeiCorpusElement<'personGrp'> {
  readonly ident: 'personGrp';
  readonly module: 'corpus';
}
export abstract class AbstractPersonGrp extends AbstractTeiCorpusElement<'personGrp'> implements IPersonGrp {
  override readonly ident: 'personGrp' = 'personGrp';
  override readonly module: 'corpus' = 'corpus';
}
export class PersonGrp extends AbstractPersonGrp {
  override readonly elementId: string = 'TEI_personGrp';
  override readonly name: string = 'personGrp';
  override readonly isAbstract: boolean = false;
}

/**
 * `<language>` — Language used in the corpus.
 *
 * @standard TEI P5 4.11.0
 * @section §2.4.2 — Language Usage
 * @element language
 * @definition characterizes a single language or sublanguage used within a text.
 * @attributes @ident (BCP 47 language tag), @usage (percentage)
 * @content character data (a human-readable name for the language)
 * @constraints It is necessary that `<language>` is contained within `<langUsage>` of `<profileDesc>` of `<teiHeader>`.
 */
export interface ILanguage extends ITeiCorpusElement<'language'> {
  readonly ident: 'language';
  readonly module: 'corpus';
}
export abstract class AbstractLanguage extends AbstractTeiCorpusElement<'language'> implements ILanguage {
  override readonly ident: 'language' = 'language';
  override readonly module: 'corpus' = 'corpus';
}
export class Language extends AbstractLanguage {
  override readonly elementId: string = 'TEI_language';
  override readonly name: string = 'language';
  override readonly isAbstract: boolean = false;
}

// ───────────────────────────────────────────────────────────────────────────
// WAVE 5 — TRANSCR MODULE (TEI P5 §11) — editorial-intervention subset
// ───────────────────────────────────────────────────────────────────────────
//
// Transcr provides the editorial-intervention vocabulary for representing
// philological/diplomatic transcriptions: alternative readings (`<choice>`),
// original-vs-regularised forms (`<orig>`/`<reg>`), error-vs-correction
// (`<sic>`/`<corr>`), abbreviation-vs-expansion (`<abbr>`/`<expan>`),
// substitutions (`<subst>`), and additions/deletions (`<add>`/`<del>`).

/**
 * @standard TEI P5 4.11.0
 * @section §11 — Representation of Primary Sources
 * @generalization ITeiElement
 */
export interface ITeiTranscrElement<TIdent extends string = string> extends ITeiElement {
  readonly module: 'transcr' | 'core';
  readonly ident: TIdent;
}

export abstract class AbstractTeiTranscrElement<const TIdent extends string = string>
  implements ITeiTranscrElement<TIdent>
{
  abstract readonly elementId: string;
  abstract readonly ident: TIdent;
  abstract readonly module: 'transcr' | 'core';
  abstract readonly name: string;
  abstract readonly isAbstract: boolean;
}

/**
 * `<choice>` — Alternative-reading container.
 *
 * @standard TEI P5 4.11.0
 * @section §3.5.1 — Apparent Errors; §11.3.4 — Editorial Choices
 * @element choice
 * @definition groups a number of alternative encodings for the same point in a text.
 * @content `<abbr>`, `<expan>`, `<orig>`, `<reg>`, `<sic>`, `<corr>`, `<seg>`, `<unclear>`, `<choice>` (recursive)
 * @constraints It is necessary that `<choice>` contains at least two alternative encodings — typically `<abbr>`/`<expan>`, `<orig>`/`<reg>`, or `<sic>`/`<corr>` pairs.
 */
export interface IChoice extends ITeiTranscrElement<'choice'> {
  readonly ident: 'choice';
  readonly module: 'core';
}
export abstract class AbstractChoice extends AbstractTeiTranscrElement<'choice'> implements IChoice {
  override readonly ident: 'choice' = 'choice';
  override readonly module: 'core' = 'core';
}
export class Choice extends AbstractChoice {
  override readonly elementId: string = 'TEI_choice';
  override readonly name: string = 'choice';
  override readonly isAbstract: boolean = false;
}

/**
 * `<orig>` — Original (non-normalised) form.
 *
 * @standard TEI P5 4.11.0
 * @section §3.5.2 — Regularization and Normalization
 * @element orig
 * @definition contains a reading which is marked as following the original, rather than being normalised or corrected.
 * @attributes @reg (deprecated; use `<choice>`/`<reg>` pairing)
 * @content macro.paraContent
 */
export interface IOrig extends ITeiTranscrElement<'orig'> {
  readonly ident: 'orig';
  readonly module: 'core';
}
export abstract class AbstractOrig extends AbstractTeiTranscrElement<'orig'> implements IOrig {
  override readonly ident: 'orig' = 'orig';
  override readonly module: 'core' = 'core';
}
export class Orig extends AbstractOrig {
  override readonly elementId: string = 'TEI_orig';
  override readonly name: string = 'orig';
  override readonly isAbstract: boolean = false;
}

/**
 * `<reg>` — Regularised (normalised) form.
 *
 * @standard TEI P5 4.11.0
 * @section §3.5.2 — Regularization and Normalization
 * @element reg
 * @definition contains a reading which has been regularized or normalized in some sense.
 * @attributes @resp, @cert
 * @content macro.paraContent
 */
export interface IReg extends ITeiTranscrElement<'reg'> {
  readonly ident: 'reg';
  readonly module: 'core';
}
export abstract class AbstractReg extends AbstractTeiTranscrElement<'reg'> implements IReg {
  override readonly ident: 'reg' = 'reg';
  override readonly module: 'core' = 'core';
}
export class Reg extends AbstractReg {
  override readonly elementId: string = 'TEI_reg';
  override readonly name: string = 'reg';
  override readonly isAbstract: boolean = false;
}

/**
 * `<sic>` — Apparent error.
 *
 * @standard TEI P5 4.11.0
 * @section §3.5.1 — Apparent Errors
 * @element sic
 * @definition contains text reproduced although apparently incorrect or inaccurate.
 * @content macro.paraContent
 */
export interface ISic extends ITeiTranscrElement<'sic'> {
  readonly ident: 'sic';
  readonly module: 'core';
}
export abstract class AbstractSic extends AbstractTeiTranscrElement<'sic'> implements ISic {
  override readonly ident: 'sic' = 'sic';
  override readonly module: 'core' = 'core';
}
export class Sic extends AbstractSic {
  override readonly elementId: string = 'TEI_sic';
  override readonly name: string = 'sic';
  override readonly isAbstract: boolean = false;
}

/**
 * `<corr>` — Editorial correction.
 *
 * @standard TEI P5 4.11.0
 * @section §3.5.1 — Apparent Errors
 * @element corr
 * @definition contains the correct form of a passage apparently erroneous in the copy text.
 * @attributes @resp, @cert
 * @content macro.paraContent
 */
export interface ICorr extends ITeiTranscrElement<'corr'> {
  readonly ident: 'corr';
  readonly module: 'core';
}
export abstract class AbstractCorr extends AbstractTeiTranscrElement<'corr'> implements ICorr {
  override readonly ident: 'corr' = 'corr';
  override readonly module: 'core' = 'core';
}
export class Corr extends AbstractCorr {
  override readonly elementId: string = 'TEI_corr';
  override readonly name: string = 'corr';
  override readonly isAbstract: boolean = false;
}

/**
 * `<abbr>` — Abbreviation.
 *
 * @standard TEI P5 4.11.0
 * @section §3.5.5 — Abbreviations and Their Expansions
 * @element abbr
 * @definition contains an abbreviation of any sort.
 * @attributes @type, @cert
 * @content character data, model.gLike, model.pPart.editorial, model.pPart.transcriptional, model.global
 */
export interface IAbbr extends ITeiTranscrElement<'abbr'> {
  readonly ident: 'abbr';
  readonly module: 'core';
}
export abstract class AbstractAbbr extends AbstractTeiTranscrElement<'abbr'> implements IAbbr {
  override readonly ident: 'abbr' = 'abbr';
  override readonly module: 'core' = 'core';
}
export class Abbr extends AbstractAbbr {
  override readonly elementId: string = 'TEI_abbr';
  override readonly name: string = 'abbr';
  override readonly isAbstract: boolean = false;
}

/**
 * `<expan>` — Expansion of an abbreviation.
 *
 * @standard TEI P5 4.11.0
 * @section §3.5.5 — Abbreviations and Their Expansions
 * @element expan
 * @definition contains the expansion of an abbreviation.
 * @attributes @resp, @cert
 * @content character data, model.gLike, model.pPart.editorial, model.global
 */
export interface IExpan extends ITeiTranscrElement<'expan'> {
  readonly ident: 'expan';
  readonly module: 'core';
}
export abstract class AbstractExpan extends AbstractTeiTranscrElement<'expan'> implements IExpan {
  override readonly ident: 'expan' = 'expan';
  override readonly module: 'core' = 'core';
}
export class Expan extends AbstractExpan {
  override readonly elementId: string = 'TEI_expan';
  override readonly name: string = 'expan';
  override readonly isAbstract: boolean = false;
}

/**
 * `<subst>` — Substitution (combined deletion + addition).
 *
 * @standard TEI P5 4.11.0
 * @section §11.3.1.5 — Substitutions
 * @element subst
 * @definition groups one or more deletions (or surplus pieces of text) with one or more additions, when the combination is to be regarded as a single intervention into the text.
 * @attributes @hand, @status
 * @content `<add>`, `<del>` (one or more of each)
 * @constraints It is necessary that `<subst>` contains at least one `<add>` and at least one `<del>`.
 */
export interface ISubst extends ITeiTranscrElement<'subst'> {
  readonly ident: 'subst';
  readonly module: 'transcr';
}
export abstract class AbstractSubst extends AbstractTeiTranscrElement<'subst'> implements ISubst {
  override readonly ident: 'subst' = 'subst';
  override readonly module: 'transcr' = 'transcr';
}
export class Subst extends AbstractSubst {
  override readonly elementId: string = 'TEI_subst';
  override readonly name: string = 'subst';
  override readonly isAbstract: boolean = false;
}

/**
 * `<add>` — Addition.
 *
 * @standard TEI P5 4.11.0
 * @section §3.5.3 — Additions, Deletions, and Omissions; §11.3.1.4 — Additions, Deletions, and Omissions
 * @element add
 * @definition contains letters, words, or phrases inserted in the source text by an author, scribe, or a previous annotator or corrector.
 * @attributes @hand, @place, @status, @cause
 * @content macro.paraContent
 */
export interface IAdd extends ITeiTranscrElement<'add'> {
  readonly ident: 'add';
  readonly module: 'core';
}
export abstract class AbstractAdd extends AbstractTeiTranscrElement<'add'> implements IAdd {
  override readonly ident: 'add' = 'add';
  override readonly module: 'core' = 'core';
}
export class Add extends AbstractAdd {
  override readonly elementId: string = 'TEI_add';
  override readonly name: string = 'add';
  override readonly isAbstract: boolean = false;
}

/**
 * `<del>` — Deletion.
 *
 * @standard TEI P5 4.11.0
 * @section §3.5.3 — Additions, Deletions, and Omissions; §11.3.1.4 — Additions, Deletions, and Omissions
 * @element del
 * @definition contains a letter, word, or passage deleted, marked as deleted, or otherwise indicated as superfluous or spurious in the copy text by an author, scribe, or a previous annotator or corrector.
 * @attributes @hand, @rend, @status, @type
 * @content macro.paraContent
 */
export interface IDel extends ITeiTranscrElement<'del'> {
  readonly ident: 'del';
  readonly module: 'core';
}
export abstract class AbstractDel extends AbstractTeiTranscrElement<'del'> implements IDel {
  override readonly ident: 'del' = 'del';
  override readonly module: 'core' = 'core';
}
export class Del extends AbstractDel {
  override readonly elementId: string = 'TEI_del';
  override readonly name: string = 'del';
  override readonly isAbstract: boolean = false;
}

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
