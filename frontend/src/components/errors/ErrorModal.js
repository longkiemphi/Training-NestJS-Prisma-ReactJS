import React from 'react';

const ErrorModal = ({ message, onClose }) => {
    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <div className="modal-header">
                        <h5 className="modal-title text-danger">Error</h5>
                    </div>
                    <div className="modal-body">
                        <p style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: message }}></p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
