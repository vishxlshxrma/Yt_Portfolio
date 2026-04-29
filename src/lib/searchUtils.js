export const normalizeSearchText = (value) =>
  String(value ?? "").toLowerCase().trim();

const toSearchList = (values) =>
  values
    .flatMap((value) => {
      if (Array.isArray(value)) return value;
      if (value === null || value === undefined) return [];
      return [value];
    })
    .map((value) => normalizeSearchText(value))
    .filter(Boolean);

export const includesQuery = (values, query) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return false;
  return toSearchList(values).some((value) => value.includes(normalizedQuery));
};

export const tokenizeSearchQuery = (query) =>
  normalizeSearchText(query)
    .split(/[\s,/-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);

export const matchesSearchQuery = (values, query) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return false;

  if (includesQuery(values, normalizedQuery)) return true;
  const tokens = tokenizeSearchQuery(normalizedQuery);
  return tokens.some((token) => includesQuery(values, token));
};

export const getSearchMatchScore = (values, query) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return 0;

  const searchValues = toSearchList(values);
  const exactCount = searchValues.filter((value) => value.includes(normalizedQuery)).length;
  const tokenCount = tokenizeSearchQuery(normalizedQuery).reduce(
    (acc, token) => acc + searchValues.filter((value) => value.includes(token)).length,
    0
  );

  return exactCount * 3 + tokenCount;
};

export const dedupeBy = (list, getKey) => {
  const seen = new Set();
  return list.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const buildSearchSuggestions = (query, { skills = [], domains = [] } = {}) => {
  const trimmed = String(query ?? "").trim();
  if (!trimmed) return [];

  const normalized = normalizeSearchText(trimmed);
  const matchedSkill = skills.find((skill) =>
    normalizeSearchText(skill.name).startsWith(normalized)
  );
  const matchedDomain = domains.find((domain) =>
    normalizeSearchText(domain.name).startsWith(normalized) ||
    normalizeSearchText(domain.shortName).startsWith(normalized)
  );

  const baseLabel = matchedSkill?.name || matchedDomain?.name || trimmed;
  const lowerBase = normalizeSearchText(baseLabel);
  const suggestions = [baseLabel, `${baseLabel} projects`, `${baseLabel} experience`];

  if (lowerBase.includes("python")) {
    suggestions.push(`${baseLabel} automation`);
  } else if (lowerBase.includes("react")) {
    suggestions.push(`${baseLabel} frontend work`, `${baseLabel} + Three.js`);
  } else {
    suggestions.push(`${baseLabel} portfolio`);
  }

  return dedupeBy(suggestions, (item) => normalizeSearchText(item)).slice(0, 6);
};
