import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader className="pizza-block"
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="268" rx="15" ry="15" width="280" height="23" />
        <rect x="0" y="310" rx="15" ry="15" width="280" height="92" />
        <rect x="6" y="419" rx="16" ry="16" width="105" height="30" />
        <rect x="126" y="419" rx="16" ry="16" width="150" height="30" />
        <circle cx="138" cy="131" r="130" />
    </ContentLoader>
)

export default Skeleton

