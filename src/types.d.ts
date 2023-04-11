type PresentationData = {
    presentationConfig: PresentationConfig;
    presentationFileContent: string[] | string;
    presentationPath: string;
    presentationStyle: string;
};

type PresentationConfig = {
    title: string;
    authors: string[];
    duration: string | number;
};
