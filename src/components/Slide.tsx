export const Slide = ({ children }: any) => {
    return (
        <section
            dangerouslySetInnerHTML={{
                __html: children,
            }}
        ></section>
    );
};
