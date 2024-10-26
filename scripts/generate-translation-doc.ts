import fs from "fs";
import locales from "../i18n/index";
import languageNames from "../i18n/languageNames";

const TARGET_FILE = "./i18n/README.md";

function getProgressColor(progress: number): string {
  if (progress <= 20) return "#FF0000";
  if (progress <= 40) return "#FF7F00";
  if (progress <= 60) return "#FFFF00";
  if (progress <= 80) return "#7FFF00";
  return "#00FF00";
}

function generateTranslationsMarkdown(locale: string): string {
  return `${locale}`;
}

export function generateReadmeLocales() {
  const availableLocales = Object.keys(locales);

  let localesListTable = "";
  for (let i = 0; i < availableLocales.length; i += 1) {
    const localesSlice = availableLocales.slice(i, i + 1);
    const row = localesSlice.map(locale => generateTranslationsMarkdown(locale)).join("");
    
    // Menghitung persentase progres dan warna yang sesuai
    const progress = (Object.keys(locales[row]).length / 16) * 100;
    const progressColor = getProgressColor(progress);

    localesListTable += `  <tr>
    <td><p align="center"><code>${row}</code></p></td>
    <td><p align="left">${languageNames[row]}</p></td>
    <td><p align="center"><img src="https://shapecolor.vercel.app/?width=14&height=14&radius=7&color=${progressColor}"/> ${progress.toFixed(2)}%</p></td>
  </tr>\n`;
  }

  const readmeContent = `<!-- DO NOT EDIT THIS FILE DIRECTLY -->
## Available Locales
Use \`?locale=LOCALE_CODE\` parameter like so :-

\`\`\`markdown
![GitHub Stats](https://gh-readme-profile.vercel.app/api?username=FajarKim&locale=id)
\`\`\`

## Locales List

<table>
  <tr>
    <td><p align="center"><b>Code</b></p></td>
    <td><p align="center"><b>Locale</b></p></td>
    <td><p align="center"><b>Progress</b></p></td>
  </tr>
${localesListTable}</table>

Want to add new translations? Consider reading the [contribution guidelines](https://github.com/FajarKim/github-readme-profile/blob/master/CONTRIBUTING.md#%EF%B8%8F-translations-contribution) :D
`;

  return readmeContent;
}

const generatedReadme = generateReadmeLocales();

fs.writeFileSync(TARGET_FILE, generatedReadme);
