import * as React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";

import "@react-pdf-viewer/core/lib/styles/index.css";

import { pageThumbnailPlugin } from "./pageThumbnailPlugin";
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface DisplayThumbnailExampleProps {
    fileUrl: string;
}

const DisplayThumbnailExample: React.FC<DisplayThumbnailExampleProps> = ({
    fileUrl,
}) => {
    const thumbnailPluginInstance = thumbnailPlugin();
    const { Cover } = thumbnailPluginInstance;
    const pageThumbnailPluginInstance = pageThumbnailPlugin({
        PageThumbnail: <Cover getPageIndex={() => 0} />,
    });

    return (
        <Viewer
            fileUrl={fileUrl}
            plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
        />
    );
};

export default DisplayThumbnailExample;
