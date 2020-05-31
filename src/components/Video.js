/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";

const BASE_URL = "https://www.youtube.com/embed/";

export default function Video({ videoId }) {
  return (
    <div>
      <iframe src={`${BASE_URL}${videoId}`} frameBorder="1" height="500px" width="1000px" />
    </div>
  );
}
