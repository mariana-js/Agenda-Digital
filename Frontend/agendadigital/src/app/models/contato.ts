export interface Contato {
  id_pessoa:string;
  id_contatoSelecionado?: string | null;
  nome_pessoa: string;

 email: string | null; 
  celular1: string;
  celular2: string;
  celular3: string;
  telefone: string;

  flag_privado:boolean;
  flag_funcionario:boolean;

}

