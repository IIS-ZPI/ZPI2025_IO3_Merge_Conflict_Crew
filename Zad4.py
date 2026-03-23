from abc import ABC, abstractmethod

class IArithmeticsDiv(ABC):
    @abstractmethod
    def division(self, a: float, b: float) -> float:
        pass

class ArithmeticDiv(IArithmeticsDiv):
    def division(self, a: float, b: float) -> float:
        #sprawdzenie wyjątku dzielenia przez zero
        if b == 0:
            raise ValueError("Dividing by zero is not allowed")
        return a / b
      
class IArithmeticsMult(ABC):
   @abstractmethod
   def multiplication(self, A: float, B: float) -> float:
      pass

class ArithmeticsMult(IArithmeticsMult):
   def multiplication(self, A: float, B: float) -> float:
      return A * B

# subtraction
#sub
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

class ArithmeticsAdd(IArithmeticsAdd):
    #Definition of the addition function
    def addition(self, A: float, B: float) -> float:
        return A + B

class IArithmeticsPow(ABC):
    @abstractmethod
    def power(self, A: float, B: float) -> float:
        pass

class ArithmeticsPow(IArithmeticsPow):
    def power(self, A: float, B: float) -> float:
        return A ** B