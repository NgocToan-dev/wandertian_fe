export default interface IEventCalEntity {
  start: string;
  end: string;
  title: string;
  icon: string; // Custom attribute.
  content?: string;
  contentFull?: string; // Custom attribute.
  class: string;
}
