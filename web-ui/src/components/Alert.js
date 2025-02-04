import React from 'react'

function Alert({ setShowAlert, type, message }) {
  return (
    <>
      {type === "error" ?
        <div className={`alert alert-danger alert-dismissible fade show`}>
          <button
            type="button" className="btn-close"
            data-bs-dismiss="alert"
            onClick={() => setShowAlert(false)}>
          </button>
          <strong>{type}:</strong> {message}
        </div> :
        <div className={`alert alert-${type} alert-dismissible fade show`}>
          <button
            type="button" className="btn-close"
            data-bs-dismiss="alert"
            onClick={() => setShowAlert(false)}>
          </button>
          <strong>{type}:</strong> {message}
        </div>
      }
    </>
  )
}

export default Alert