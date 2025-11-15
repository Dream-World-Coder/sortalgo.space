import { ParsedMetaData } from "./MetaParser";

export function getSchemaData(metaData: ParsedMetaData) {
  // converts parsed metadata into schema.org json-ld format
  // it returns a plain object that you can insert inside:
  // <script type="application/ld+json">{...}</script>

  // extract values for convenience
  const {
    title,
    subtitle,
    authors,
    dateCreated,
    dateEdited,
    description,
    tags,
    category,
    slug,
    language,
    readingTime,
  } = metaData;

  // build author objects
  // schema.org expects an array of objects with a @type and name
  const authorObjects = authors.map((name) => ({
    "@type": "Person",
    name,
  }));

  // build the final schema.org data object
  // using article / blogposting schema (most suitable for markdown pages)
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",

    // required or important fields
    headline: title,
    description,
    author: authorObjects,
    datePublished: dateCreated,
    dateModified: dateEdited,

    // optional, only included if present
    inLanguage: language ?? "en",
    keywords: tags.join(", "),
    articleSection: category,
    alternativeHeadline: subtitle,
    timeRequired: readingTime ? `PT${readingTime}M` : undefined,

    // your slug can be used as identifier
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": slug,
    },
  };

  // remove undefined fields because schema.org prefers clean objects
  for (const key in schema) {
    if (schema[key as keyof typeof schema] === undefined) {
      delete schema[key as keyof typeof schema];
    }
  }

  return schema;
}
