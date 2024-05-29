import { memo, useState } from "react";

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log("[ARTIFICIALLY SLOW] Rendering <ShippingForm />");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("call");
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count,
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <p>
            <b>
              Note: <code>ShippingForm</code> is artificially slowed down!
            </b>
          </p>
          <label>Number of items: </label>
          <button
            type="button"
            className="defaultBtn"
            onClick={() => setCount(count - 1)}
          >
            –
          </button>
          {count}
          <button
            type="button"
            className="defaultBtn"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>
        <div className="col">
          <label>
            Street:
            <input name="street" type="text" />
          </label>
          <label>
            City:
            <input name="city" type="text" />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="submit" className="defaultBtn">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
});

export default ShippingForm;
