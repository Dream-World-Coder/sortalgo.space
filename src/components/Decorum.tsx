export function CornerPlusIcons({
  topLeft = true,
  topRight = true,
  bottomLeft = true,
  bottomRight = true,
}: {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
}) {
  return (
    <>
      {topLeft && (
        <div className="absolute text-2xl top-0 left-0 text-neutral-300 dark:text-neutral-700 transform -translate-y-4 -translate-x-2">
          +
        </div>
      )}

      {topRight && (
        <div className="absolute text-2xl top-0 left-full text-neutral-300 dark:text-neutral-700 transform -translate-y-4 -translate-x-2">
          +
        </div>
      )}

      {bottomLeft && (
        <div className="absolute text-2xl top-full left-0 text-neutral-300 dark:text-neutral-700 transform -translate-y-4 -translate-x-2">
          +
        </div>
      )}

      {bottomRight && (
        <div className="absolute text-2xl top-full left-full text-neutral-300 dark:text-neutral-700 transform -translate-y-4 -translate-x-2">
          +
        </div>
      )}
    </>
  );
}
