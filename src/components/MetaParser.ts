/**
 * it takes a markdown string as argument and returns a object containg metadata
 * @param content :string
 * marker: <!--metadata\n{...}\n-->
 *
 * finds the first occuring such tag.
 <!--metadata
   title: "" !required
   subtitle: ""
   authors: ["",""] !required
   dateCreated: "dd/mm/yyyy" !required
   dateEdited: "dd/mm/yyyy" !required
   description: "" !required
   tags: ["", ""] !required // use "", not ''
   category: ""
   readingTime: ""
   slug: "" !required
   language: "en"
   version: "1.0"
   draft: false
 -->
 */

export type ParsedMetaData = {
  // !required
  title: string;
  authors: string[];
  dateCreated: string; // format: dd/mm/yyyy
  dateEdited: string; // format: dd/mm/yyyy
  description: string;
  tags: string[];
  slug: string;

  // optional
  subtitle?: string;
  category?: string;
  readingTime?: string;
  language?: string; // default: "en"
  version?: string; // default: "1.0"
  draft?: boolean; // default: false
};

export default function metaDataParser(content: string): ParsedMetaData {
  // using a lazy match so it stops at the first "-->"
  const match = content.match(/<!--metadata([\s\S]*?)-->/);

  // if no metadata block exists, throw an error
  if (!match) {
    throw new Error("metadata block not found");
  }

  // extract only the inner text (everything between <!--metadata and -->)
  const raw = match[1].trim();

  // split into lines and parse them
  // each line looks like: key: value
  const lines = raw.split("\n");

  const data: any = {};

  for (let line of lines) {
    // remove leading/trailing spaces
    line = line.trim();

    // skip empty lines
    if (!line) continue;

    // split at first colon
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // remove inline comments like !required
    value = value.replace(/!required/g, "").trim();

    // parse arrays: ["a","b"]
    if (/^\[.*\]$/.test(value)) {
      // parse using json
      try {
        data[key] = JSON.parse(value);
      } catch {
        throw new Error(`invalid array format in metadata for key "${key}"`);
      }
      continue;
    }

    // parse booleans: true / false
    if (value === "true" || value === "false") {
      data[key] = value === "true";
      continue;
    }

    // remove wrapping quotes for strings
    if (/^".*"$/.test(value)) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  // now apply defaults and enforce required fields
  const requiredFields = [
    "title",
    "authors",
    "dateCreated",
    "dateEdited",
    "description",
    "tags",
    "slug",
  ];

  for (const field of requiredFields) {
    if (data[field] === undefined) {
      throw new Error(`required metadata field missing: ${field}`);
    }
  }

  // return metadata with defaults filled in
  const parsed: ParsedMetaData = {
    title: data.title,
    authors: data.authors,
    dateCreated: data.dateCreated,
    dateEdited: data.dateEdited,
    description: data.description,
    tags: data.tags,
    slug: data.slug,

    subtitle: data.subtitle,
    category: data.category,
    readingTime: data.readingTime,

    language: data.language ?? "en",
    version: data.version ?? "1.0",
    draft: data.draft ?? false,
  };

  return parsed;
}
