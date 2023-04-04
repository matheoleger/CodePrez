type PresentationData = {
    presentationConfig: PresentationConfig, 
    presentationFileContent: string, 
    presentationPath: string
}

type PresentationConfig = {
    title : string,
    authors : string[],
    duration : string | number
}