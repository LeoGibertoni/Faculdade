//Polimorfismo

//Sobreposição (overriding

public class animal
{
    public virtual void emitirSom()
    {
        Console.WriteLine("Som");
    }
}

public class lead : animal
{
    public override void emitirSom()
    {
        Console.WriteLine("ROARRR");
    }
}

//virtual → permite que um método seja sobrescrito.
//override → sobrescreve a implementação do método da classe base.  

//Sobrecarga (Overloading)

public int soma(int n1, int n2)
{
    return n1 + n2;
}

public double soma(double n1, double n2)
{
    return n1 + n2;
}

///Interface
//esse I antes do Animal é para falar que é interface

public interface IAnimal
{
    void FazerBarulho();
}

//Implementação para a classe Gato que implementa a interface IAnimal
public class Gato : IAnimal
{
    public void FazerBarulho()
    {
        Console.WriteLine("Miau");
    }
}

