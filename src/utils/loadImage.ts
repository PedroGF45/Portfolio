export default function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const loader = new Image();
    loader.onload = () => res(loader);
    loader.onerror = () => rej(new Error('load-failed'));
    loader.src = url;
  });
}
