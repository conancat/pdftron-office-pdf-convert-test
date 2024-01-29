import { PDFNet } from "@pdftron/pdfnet-node";

import { resolve } from "node:path";

const PDFTRON_LICENSE_KEY = process.env.PDFTRON_LICENSE_KEY;

const generateTestPdf = async () => {
  const TEMPLATE_DOC_PATH = "./assets/test-template-embedded-fonts.docx";

  const OUTPUT_PATH = `./out/test-output-embedded-fonts-${Date.now()}.pdf`;

  PDFNet.addResourceSearchPath(resolve("./assets/"));
  PDFNet.WebFontDownloader.setCustomWebFontURL(
    `file://${resolve("./assets/fonts/")}`
  );

  const options = new PDFNet.Convert.OfficeToPDFOptions();
  const templateDoc = await PDFNet.Convert.createOfficeTemplateWithPath(
    TEMPLATE_DOC_PATH,
    options
  );

  const jsonTemplateData = {
    paragraph1:
      "Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.",
    paragraph2:
      "Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers. Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.",
    paragraph3:
      "人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは、世界における自由、正義及び平和の基礎であるので、 人権の無視及び軽侮が、人類の良心を踏みにじった野蛮行為をもたらし、言論及び信仰の自由が受けられ、恐怖及び欠乏のない世界の到来が、一般の人々の最高の願望として宣言されたので、",
    paragraph4:
      "人間が専制と圧迫とに対する最後の手段として反逆に訴えることがないようにするためには、法の支配によって人権を保護することが肝要であるので、 諸国間の友好関係の発展を促進することが肝要であるので、国際連合の諸国民は、国連憲章において、基本的人権、人間の尊厳及び価値並びに男女の同権についての信念を再確認し、かつ、一層大きな自由のうちで社会的進歩と生活水準の向上とを促進することを決意したので、",
    paragraph5:
      "Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, 人権の無視及び軽侮が、人類の良心を踏みにじった野蛮行為をもたらし、言論及び信仰の自由が受けられ、恐怖及び欠乏のない世界の到来が、一般の人々の最高の願望として宣言されたので、",
    paragraph6:
      "Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, 諸国間の友好関係の発展を促進することが肝要であるので、国際連合の諸国民は、国連憲章において、基本的人権、人間の尊厳及び価値並びに男女の同権についての信念を再確認し、かつ、一層大きな自由のうちで社会的進歩と生活水準の向上とを促進することを決意したので、",
    paragraph7:
      "人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは、世界における自由、正義及び平和の基礎であるので、either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.",
    paragraph8:
      "人間が専制と圧迫とに対する最後の手段として反逆に訴えることがないようにするためには、法の支配によって人権を保護することが肝要であるので、receive and impart information and ideas through any media and regardless of frontiers. Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.",
  };
  const pdfDoc = await templateDoc.fillTemplateJson(
    JSON.stringify(jsonTemplateData)
  );
  await pdfDoc.save(OUTPUT_PATH, PDFNet.SDFDoc.SaveOptions.e_linearized);
  console.log(`Generated test pdf to ${OUTPUT_PATH}`);
};

PDFNet.runWithCleanup(generateTestPdf, PDFTRON_LICENSE_KEY)
  .catch(function (error: Error) {
    console.error(error);
  })
  .then(() => {
    return PDFNet.shutdown();
  });
