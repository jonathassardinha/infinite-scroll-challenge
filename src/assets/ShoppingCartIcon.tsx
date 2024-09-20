export function ShoppingCartIcon(props: { className?: string }) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      width="24"
      height="24"
      color="#000000"
      {...props}
    >
      <polyline
        className="fill-none stroke-current [stroke-miterlimit:10]"
        points="7.21 15.82 22.48 12.96 22.48 4.36 4.15 4.36"
      ></polyline>
      <path
        className="fill-none stroke-current [stroke-miterlimit:10]"
        d="M.52,1.5H3.39L7.2,15.82,5.54,18.31a1.48,1.48,0,0,0-.24.82h0a1.46,1.46,0,0,0,1.46,1.46h11.9"
      ></path>
      <circle
        className="fill-none stroke-current [stroke-miterlimit:10]"
        cx="18.66"
        cy="21.55"
        r="0.95"
      ></circle>
      <circle
        className="fill-none stroke-current [stroke-miterlimit:10]"
        cx="9.11"
        cy="21.55"
        r="0.95"
      ></circle>
    </svg>
  );
}
