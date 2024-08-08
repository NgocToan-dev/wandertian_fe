import IBaseEntity from "./IBaseEntity";

interface IEventEntity extends IBaseEntity {
  title: string;
  type: number;
  startDate: Date;
  endDate: Date;
  note?: string;
  link?: string;
  location?: string;
  color: string;
}

export default IEventEntity;