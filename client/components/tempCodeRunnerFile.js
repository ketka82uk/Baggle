<div className={`modal ${modalStateInvText}`}>
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <h2> Would you like to make an offer?</h2>
    </header>
    <section className="modal-card-body">
      <div className="contents">


        <h2> Would you like to make an offer?</h2>

        <form action="">
          {!isCreator(item.owner['id']) && currentUserInventory.map((item, index) => {
            const available = item.listed
            return <div key={index}>
              <div>
                {available ? <button className='button is-primary' id={item.id} onClick={(e) => fetch(e.target.id)}>  {item.id} {item.name}  </button> :
                  <button className='button is-warning'> {item.name} </button>
                }
              </div>
            </div>

          })}
        </form>


      </div>
    </section>
    <footer className="modal-card-foot">

      <button className="button" onClick={() => toggleInventoryModal()}>Close</button>
    </footer>
  </div>
</div>