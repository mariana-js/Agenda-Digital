export interface Funcionario {
    id_funcionario: string;
    id_setor_ramal: string;
    id_pessoa: string;
    nome: string;
    setor: string;
    foto: File | null;

    data_nascimento: string;
    dia: string;
    mes: string;
    sigla: string;
}
