export default function TxList({ txs }) {
    if (txs.length === 0) return null;
  
    return (
      <>
        {txs.map((item) => (
          <div key={item} className=" alert alert-info mt-5 text-yellow-400 flex flex-wrap flex-col">
            
              <label htmlFor="">{item.hash}</label>
            </div>
        ))}
      </>
    );
  }
  