import React from 'react'

const LanguageDataForm = ({ videoData, inputData }) => {
    return (
        <div className='language-data-form-wrapper'>
            <div className="dual-text-display">
                <div className="each-input-text-wrap language">
                    <span className="input-label">Programming Language</span>
                    <input type="text" className="code-quack-main-input" onChange={(event) => inputData(event, "language")} value={videoData?.language} />
                </div>
                <div className="each-input-text-wrap">
                    <span className="input-label">Video URL</span>
                    <input type="text" className="code-quack-main-input" onChange={(event) => inputData(event, "url")} value={videoData?.url} />
                </div>
            </div>
            <div className="each-input-text-wrap">
                <span className="input-label">Short Description</span>
                <input type="text" className="code-quack-main-input" onChange={(event) => inputData(event, "shortDescription")} value={videoData?.shortDescription} />
            </div>
            <div className="each-input-text-wrap">
                <span className="input-label">Long Description</span>
                <textarea cols={5} rows={10} onChange={(event) => inputData(event, "longDescription")} value={videoData?.longDescription} className="code-quack-main-text-area" />
            </div>
        </div>
    )
}

export default LanguageDataForm