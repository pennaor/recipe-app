import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../style/Loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <Spinner
        animation="border"
        role="status"
        variant="danger"
        aria-label="Carregando"
      />
    </div>
  );
}
