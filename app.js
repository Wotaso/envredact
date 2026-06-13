const DEFAULT_KEYWORDS = [
  "key",
  "token",
  "secret",
  "private",
  "password",
  "pass",
  "passwd",
  "pwd",
  "auth",
  "credential",
  "bearer",
];

const envInput = document.getElementById("envInput");
const envOutput = document.getElementById("envOutput");
const keywordsInput = document.getElementById("keywordsInput");
const copyBtn = document.getElementById("copyBtn");

keywordsInput.value = DEFAULT_KEYWORDS.join(", ");

function normalizeKeywords(raw) {
  return raw
    .split(/[,\n\s]+/)
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

function splitValueAndComment(rawValue) {
  let inSingle = false;
  let inDouble = false;
  let escaped = false;

  for (let i = 0; i < rawValue.length; i += 1) {
    const char = rawValue[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (!inDouble && char === "'") {
      inSingle = !inSingle;
      continue;
    }

    if (!inSingle && char === '"') {
      inDouble = !inDouble;
      continue;
    }

    if (!inSingle && !inDouble && char === "#") {
      return {
        value: rawValue.slice(0, i),
        comment: rawValue.slice(i),
      };
    }
  }

  return { value: rawValue, comment: "" };
}

function replaceValue(value) {
  const leadingWhitespace = value.match(/^\s*/)[0];
  const trailingWhitespace = value.match(/\s*$/)[0];
  const trimmed = value.trim();
  let redactedValue;

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    redactedValue = '"<redacted>"';
  } else if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    redactedValue = "'<redacted>'";
  } else {
    redactedValue = "<redacted>";
  }

  return `${leadingWhitespace}${redactedValue}${trailingWhitespace}`;
}

function redactEnvContent(content, keywords) {
  const lines = content.split("\n");

  return lines
    .map((line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        return line;
      }

      const match = line.match(/^(\s*)(export\s+)?([A-Za-z_][A-Za-z0-9_]*)(\s*=\s*)(.*)$/);
      if (!match) {
        return line;
      }

      const [, indent, exportPrefix = "", rawName, separator, rawValue] = match;
      const varName = rawName.toLowerCase();
      const shouldRedact = keywords.some((keyword) => varName.includes(keyword));

      if (!shouldRedact) {
        return line;
      }

      const { value, comment } = splitValueAndComment(rawValue);
      if (!value.trim()) {
        return line;
      }

      const maskedValue = replaceValue(value);
      return `${indent}${exportPrefix}${rawName}${separator}${maskedValue}${comment}`;
    })
    .join("\n");
}

function updateOutput() {
  const keywords = normalizeKeywords(keywordsInput.value);
  envOutput.value = redactEnvContent(envInput.value, keywords);
}

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(envOutput.value);
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1400);
  } catch {
    copyBtn.textContent = "Error";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1400);
  }
});

envInput.addEventListener("input", updateOutput);
keywordsInput.addEventListener("input", updateOutput);

updateOutput();
