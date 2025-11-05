function Notas({ grades, deleteGrade }) {
  return (
    <section aria-labelledby="mis-notas">
      <h2 id="mis-notas" className="h4 fw-semibold mb-4">
        Mis Notas
      </h2>
      <div className="row g-3">
        {grades.length === 0 ? (
          <h3 className="fs-4 text-center fw-light">No hay notas</h3>
        ): 
        (
            grades.map(grade =>
                <div className="col-md-3 col-sm-6 col-12" key={grade.id}>
                    <article className={`card note-card ${grade.color}  p-3 d-flex flex-column justify-content-between`}>
                        <div>
                            <h3 className="h6 fw-bold">{grade.title}</h3>
                            <p className="mb-3">{grade.description}</p>
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm btn-delete mt-auto align-self-end"
                            >
                            <i className="bi bi-trash" onClick={()=>deleteGrade(grade.id)}></i>
                        </button>
                    </article>
                </div>
            )
        )}
      </div>
    </section>
  );
};

export default Notas;
