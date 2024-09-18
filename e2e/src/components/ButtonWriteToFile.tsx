import tutorialStore from 'tutorialkit:store';
import { webcontainer } from 'tutorialkit:core';

interface Props {
  filePath: string;
  newContent: string;

  // default to 'store'
  access?: 'store' | 'webcontainer';
  testId?: string;
}

export function ButtonWriteToFile({ filePath, newContent, access = 'store', testId = 'write-to-file' }: Props) {
  async function writeFile() {
    switch (access) {
      case 'webcontainer': {
        const webcontainerInstance = await webcontainer;

        await webcontainerInstance.fs.writeFile(filePath, newContent);

        return;
      }
      case 'store': {
        tutorialStore.updateFile(filePath, newContent);
        return;
      }
    }
  }

  return (
    <button data-testid={testId} onClick={writeFile}>
      Write to File
    </button>
  );
}