import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={466}
    height={280}
    viewBox="0 0 466 280"
    backgroundColor="#b0b0b0"
    foregroundColor="#ffffff">
    <circle cx="117" cy="63" r="64" />
    <rect x="58" y="146" rx="0" ry="0" width="125" height="19" />
    <rect x="52" y="211" rx="0" ry="0" width="35" height="15" />
    <rect x="106" y="211" rx="0" ry="0" width="35" height="15" />
    <rect x="154" y="211" rx="0" ry="0" width="35" height="15" />
    <rect x="45" y="178" rx="0" ry="0" width="48" height="15" />
    <rect x="150" y="177" rx="0" ry="0" width="48" height="15" />
    <rect x="40" y="251" rx="0" ry="0" width="55" height="17" />
    <rect x="149" y="250" rx="0" ry="0" width="54" height="17" />
  </ContentLoader>
);

export default Skeleton;
