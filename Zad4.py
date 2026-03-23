from abc import ABC, abstractmethod

#Ta funckja dzieli


# division
#div
class IArithmeticsDiv(ABC):
    @abstractmethod
    def division(self, a: float, b: float) -> float:
        pass

class ArithmeticDiv(IArithmeticsDiv):
    #funkcja służy do dzielenia dwóch liczb
    def division(self, a: float, b: float) -> float:
        #sprawdzenie wyjątku dzielenia przez zero
        if b == 0:
            raise ValueError("Dividing by zero is not allowed")
        #zwraca wynik dzielenia
        return a / b

# multiplication
#mul
class IArithmeticsMult(ABC):
   @abstractmethod
   def multiplication(self, A: float, B: float) -> float:
      pass

class ArithmeticsMult(IArithmeticsMult):
   def multiplication(self, A: float, B: float) -> float:
      return A * B

# subtraction
class IArithmeticDiff(ABC):
    @abstractmethod
    def difference(self,A: float,B: float) -> float:
        pass

class ArithmeticDiff(IArithmeticDiff):
    def difference(self, A:float,B:float) -> float:
        return A - B
#add
class IArithmeticsAdd(ABC):
    @abstractmethod
    def addition(self, A: float, B: float) -> float:
        pass
# This function adds two numbers together
class ArithmeticsAdd(IArithmeticsAdd):
    #Definition of the addition function
    def addition(self, A: float, B: float) -> float:
        #Return of adding A and B
        return A + B

class IArithmeticsPow(ABC):
    @abstractmethod
    def power(self, A: float, B: float) -> float:
        pass
#Ta funckja poteguje
class ArithmeticsPow(IArithmeticsPow):
    def power(self, A: float, B: float) -> float:
        return A ** B