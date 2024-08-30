import StackBlitzSDK from '@stackblitz/sdk';
import { tutorialStore } from './webcontainer.js';

export function OpenInStackblitzLink() {
  return (
    <button
      title="Open in StackBlitz"
      className="flex items-center font-size-3.5 text-tk-elements-topBar-iconButton-iconColor hover:text-tk-elements-topBar-iconButton-iconColorHover transition-theme bg-tk-elements-topBar-iconButton-backgroundColor hover:bg-tk-elements-topBar-iconButton-backgroundColorHover p-1 rounded-md"
      onClick={onClick}
    >
      <svg viewBox="0 0 28 28" aria-hidden="true" height="24" width="24">
        <path
          fill="currentColor"
          d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.671-10.227z"
        ></path>
      </svg>
    </button>
  );
}

function onClick() {
  const lesson = tutorialStore.lesson;

  if (!lesson) {
    throw new Error('Missing lesson');
  }

  const snapshot = tutorialStore.takeSnapshot();
  const options = typeof lesson.data.openInStackBlitz === 'object' ? lesson.data.openInStackBlitz : {};

  StackBlitzSDK.openProject({
    title: options.projectTitle || 'Project generated by TutorialKit',
    description: options.projectDescription,
    template: options.projectTemplate || 'node',
    files: snapshot.files,
  });
}
