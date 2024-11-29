import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import type { VCard } from '../../types';

export function useShare() {
  const generateVCardFile = async (vcard: VCard): Promise<string> => {
    const vcardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${vcard.name}`,
      `TITLE:${vcard.title}`,
      `ORG:${vcard.company}`,
      `EMAIL;type=WORK:${vcard.email}`,
      `TEL;type=WORK:${vcard.phone}`,
      vcard.website ? `URL:${vcard.website}` : '',
      vcard.bio ? `NOTE:${vcard.bio}` : '',
      'END:VCARD'
    ].filter(Boolean).join('\n');

    const filePath = `${RNFS.CachesDirectoryPath}/${vcard.name.replace(/\s+/g, '_')}.vcf`;
    await RNFS.writeFile(filePath, vcardContent, 'utf8');
    return filePath;
  };

  const shareVCard = async (vcard: VCard) => {
    try {
      const filePath = await generateVCardFile(vcard);
      await Share.open({
        title: `${vcard.name}'s Contact Card`,
        url: `file://${filePath}`,
        type: 'text/vcard',
      });
    } catch (error) {
      console.error('Error sharing vCard:', error);
      throw error;
    }
  };

  const previewVCard = async (vcard: VCard) => {
    try {
      const filePath = await generateVCardFile(vcard);
      await FileViewer.open(filePath, {
        showOpenWithDialog: true,
      });
    } catch (error) {
      console.error('Error previewing vCard:', error);
      throw error;
    }
  };

  return {
    shareVCard,
    previewVCard,
  };
}