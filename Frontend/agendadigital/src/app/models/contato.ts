export interface Contato {
  id_pessoa:string;
  id_contatoSelecionado?: string | null;
  nome_pessoa: string;

  email: string;
  celular_corporativo: string;
  celular_pessoal: string;
  telefone: string;

  flag_privado:boolean;
  flag_funcionario:boolean;

}

