import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getPastOrders from '../api/getPastOrders';
import getPastOrder from '../api/getPastOrder';
import Modal from '../Modal';
import ErrorBoundary from '../ErrorBoundary';

const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'INR'
});

function ErrorBoundayWrappedPassedOrderRoutes( ){
  return (
    <ErrorBoundary>
      <PastOrdersRoute/>
    </ErrorBoundary>
  )
}

export const Route = createLazyFileRoute('/past')({
  component: ErrorBoundayWrappedPassedOrderRoutes,
})

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState(null);
  const {isLoading, data} = useQuery({
    queryKey: ['past-orders', page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  const {isLoading: isLoadingPastOrder, data: pastOrderData} = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 86400000,
    enabled: !!focusedOrder // only gets if there's a focusedOrder, !! for type coersion
  });  

  if(isLoading) {
    return (
      <div className='past-orders'>
        <h2>Loading ...</h2>
      </div>
    )
  }
  console.log(pastOrderData?.orderItems, "this is past order data");

  // return (
  //   <div className="past-orders">
  //     <table>
  //       <thead>
  //         <tr>
  //           <td>ID</td>
  //           <td>Date</td>
  //           <td>Time</td>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.map((order) => (
  //           <tr key={order.order_id}>
  //             <td >
  //               <button onClick={() => setFocusedOrder(order.order_id)}>
  //                 {order.order_id}
  //               </button>
  //             </td>
  //             <td>{order.date}</td>
  //             <td>{order.time}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //     <div className="pages">
  //       <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
  //         Previous
  //       </button>
  //       <div>{page}</div>
  //       <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
  //         Next
  //       </button>
  //     </div>
  //     {
  //       focusedOrder ? (
  //         <Modal>
  //         <h2>Order #{focusedOrder}</h2>
  //         {!isLoadingPastOrder ? (
  //           <table>
  //             <thead>
  //               <tr>
  //                 <td>Image</td>
  //                 <td>Name </td>
  //                 <td>Size</td>
  //                 <td>Price</td>
  //                 <td>Total</td>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {pastOrderData.orderItems.map(pizza => {
  //                 <tr key={`${pizza.pizzTypeId}_${pizza.size}`}>
  //                   <td>
  //                     <img src={pizza.image} alt={pizza.name} />
  //                   </td>
  //                   <td>
  //                     {pizza.name}
  //                   </td>
  //                   <td>
  //                     {pizza.size}
  //                   </td>
  //                   <td>
  //                     {pizza.quantity}
  //                   </td>
  //                   <td>
  //                     {intl.format(pizza.price * 86.14)}
  //                   </td>
  //                   <td>
  //                     {intl.format(pizza.total * 86.14)}
  //                   </td>
  //                 </tr>
  //               }) }
  //             </tbody>
  //           </table>
  //         ) : (
  //           <p>Loading...</p>
  //         )}
  //         <button onClick={() => setFocusedOrder(null)}>Close</button>
  //       </Modal>) : null
  //     }
  //   </div>
  // );

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{intl.format(pizza.price * 86.14)}</td>
                    <td>{intl.format(pizza.total * 86.14)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading …</p>
          )}
          <button onClick={() => setFocusedOrder()}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
