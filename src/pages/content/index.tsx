import {ETabActive} from '../contants'

export default function Content(props:{tabActive:number}){
  let tmp:any = <div></div>
  switch(props?.tabActive){
    case ETabActive.PERINSTALL:
      tmp = <div>预装app</div>;
      break;
    case ETabActive.test:
      tmp = <div>test</div>;
      break;
  }
  return tmp;
}
