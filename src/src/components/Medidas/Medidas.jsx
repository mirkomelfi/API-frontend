const Medidas = ({medidas})=>{
    console.log(medidas)
    return (
        <>
        {medidas&&
            <div className="tarjetaProducto">
                {medidas.map(medida => <h2>{medida}</h2>)}
            </div>
        }
        </>

    )
}
export  {Medidas}